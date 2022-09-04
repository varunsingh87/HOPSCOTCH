import { useRouter } from "next/router"
import { ConvexHttpClient } from "convex/browser";
import clientConfig from "../../convex/_generated/clientConfig";
import Head from "next/head"
import { TabPane, Tab, TabContent, Nav, NavItem, NavLink, Dropdown, Row, Col, Card, CardTitle, CardText, Button } from "reactstrap"
import classnames from "classnames"
import { useState } from "react";

const convex = new ConvexHttpClient(clientConfig);

export default function App(props) {
    const [activeTab, setActiveTab] = useState(1)

    const toggle = tab => {
        if (activeTab !== tab)
            setActiveTab(tab)
    }

    return (
        <div>
            <Head>
                <title>{props.name} | Musathon</title>
            </Head>
            <h1>{props.name}</h1>
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Tab1
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Moar Tabs
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Tab 1 Contents</h4>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const competition = await convex.query("getCompetition")(context.params.id)
    competition.id = competition._id = competition._id.id

    return { props: competition }
}

export async function getStaticPaths() {
    const competitions = await convex.query("listCompetitions")();
    return {
        paths: competitions.map(item => {
            return {
                params: { id: item._id.id }
            }
        }),
        fallback: false
    }
}