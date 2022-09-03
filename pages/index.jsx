import { useEffect, useState } from "react";
import { Card, CardBody, CardGroup, CardTitle, CardImg, CardSubtitle, CardText, Button, Container, Col, Row } from "reactstrap";
import { GeoAlt } from "react-bootstrap-icons"
import { useMutation, useQuery } from "../convex/_generated/react";
import Head from "next/head"
import Link from "next/link";
import styles from "../styles/Home.module.css"

// Render a competition preview
function CompetitionView(props) {
    const startDate = new Date(props._creationTime).toLocaleDateString()
    return (
        <Card className="px-3 py-3 m-lg-5 flex-sm-fill" outline>
            <CardTitle><h1>{props.name}!</h1></CardTitle>
            <CardBody>
                <Row>
                    <Col className="col-6">
                        <p>{props.description || <span style={{ fontStyle: 'italic' }}>No description provided</span>}</p>
                        <p><GeoAlt /> {props.locationCategory}, {props.access}</p>
                        <p>${props.totalPrizeValue} in Prizes</p>
                    </Col>
                    <Col className="col-6">
                        <h2><strong>32</strong> participants</h2>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default function App() {
    // Dynamically update `competitions` in response to the output of
    // `listCompetitions.ts`.
    const competitions = useQuery("listCompetitions") || [];

    const [name, setName] = useState('user name');
    useEffect(() => {
        const randomName = "User " + Math.floor(Math.random() * 10000);
        setName(randomName);
    }, [])

    return (
        <Container className="my-lg-4">
            <Head>
                <title>Browse Competitions</title>
            </Head>

            <h1 className="text-center">Competitions</h1>
            <p className="text-center">
                <span className="badge bg-dark">{name}</span>
            </p>
            <CardGroup className="shadow-sm my-3">
                {competitions.slice(-10).map((competition) => (
                    <CompetitionView key={competition._id} {...competition} />
                ))}
            </CardGroup>
            <CardGroup>
                <Card>
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/318/180"
                        top
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                        </CardText>
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/318/180"
                        top
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This card has supporting text below as a natural lead-in to additional content.
                        </CardText>
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/318/180"
                        top
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
                        </CardText>
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                </Card>
            </CardGroup>
            <Link href="/new-competition"><a className="btn btn-primary outline">+ Add Competition</a></Link>
        </Container>
    );
}
