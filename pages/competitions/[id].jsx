import classnames from "classnames";
import { ConvexHttpClient } from "convex/browser";
import Head from "next/head";
import { useState } from "react";
import { Button, Card, CardText, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import clientConfig from "../../convex/_generated/clientConfig";
import { useQuery } from '../../convex/_generated/react';

const convex = new ConvexHttpClient(clientConfig);

export default function App(props) {
    const participants = useQuery('listParticipants', props.id)
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
            <Container className="text-center">
                <h1>{props.name}</h1>
                <div className="btn btn-outline-primary">Register for Competition</div>
            </Container>

            <div className="mt-3">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 1 })}
                            onClick={() => { toggle(1); }}
                            style={{ cursor: 'pointer' }}
                        >
                            Overview
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => { toggle(2); }}
                            style={{ cursor: 'pointer' }}
                        >
                            Rules
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => { toggle(3); }}
                            style={{ cursor: 'pointer' }}
                        >
                            Prizes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => { toggle(4); }}
                            style={{ cursor: 'pointer' }}>
                            Participants
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 5 })}
                            onClick={() => { toggle(5); }}
                            style={{ cursor: 'pointer' }}>
                            Music Gallery
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="8">
                                <p>{props.description}</p>
                            </Col>
                            <Col sm="4">
                                <img src={props.thumbnail} height="100" width="100" />
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
                    <TabPane tabId="3">

                    </TabPane>
                    <TabPane tabId="4">
                        {JSON.stringify(participants)}
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