import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GeoAlt } from "react-bootstrap-icons";
import { Col, ButtonGroup, Button, ButtonToggle, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardTitle, Container, FormGroup, Input, Label, Row, List } from "reactstrap";
import { useQuery } from "../convex/_generated/react";
import styles from '../styles/Home.module.css'
import classnames from "classnames"

// Render a competition preview
function CompetitionView(props) {
    const startDate = new Date(props._creationTime).toLocaleDateString()
    return (
        <Card style={{ flexBasis: '350px', flexGrow: 0 }} className={classnames("mb-5", "mx-2", "p-3", "rounded", "border", styles.competitionView)}>
            <Link href={`/competitions/${props._id}`} >
                <a style={{ textDecoration: 'none', color: 'unset' }}>
                    <CardImg
                        alt="Card image cap"
                        src={props.thumbnail || 'https://picsum.photos/318/181'}
                    />
                    <CardTitle tag="h1">{props.name}</CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        {props.description || <span style={{ fontStyle: 'italic' }}>No description provided</span>}
                    </CardSubtitle>
                    <p><GeoAlt /> {props.locationCategory}, {props.access}
                        <br />${props.totalPrizeValue} in Prizes
                        <br /><strong>{Math.round(Math.random() * 32) + 60}</strong> participants
                    </p>
                </a>
            </Link>
        </Card >
    );
}

export default function App() {
    // Dynamically update `competitions` in response to the output of
    // `listCompetitions.ts`.
    const competitions = useQuery("listCompetitions") || [];

    const router = useRouter()

    return (
        <>
            <Head>
                <title>Browse Competitions</title>
            </Head>
            <h1 className="text-center">Competitions</h1>
            <Row>
                <Col lg="10">
                    <CardGroup className="my-3">
                        {competitions.filter(item => !router.query.q || item.name?.includes(router.query.q) || item.description?.includes(router.query.q)).map((competition) => (
                            <CompetitionView key={competition._id} {...competition} />
                        ))}
                    </CardGroup>
                </Col>
                <Col lg="2">
                    <p>All Network Sites</p>
                    <List type="unstyled">
                        <li><img width="20" src="/MusathonLogo.png" /><Link href="/musathons">Musathons</Link></li>
                        <li><Link href="/hackathons">Hackathons</Link></li>
                        <li><Link href="/bookathons">Bookathons</Link></li>
                        <li><Link href="/filmathons">Filmathons</Link></li>
                        <li><Link href="/ideathons">Ideathons</Link></li>
                    </List>
                </Col>
            </Row>

        </>
    );
}
