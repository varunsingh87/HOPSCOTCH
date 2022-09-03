import { useEffect, useState } from "react";
import { Card, CardBody, CardGroup, CardTitle, Input, Label, CardImg, CardSubtitle, FormGroup, Button, Container, Col, Row } from "reactstrap";
import { GeoAlt, Search } from "react-bootstrap-icons"
import { useMutation, useQuery } from "../convex/_generated/react";
import Head from "next/head"
import Link from "next/link";
import styles from "../styles/Home.module.css"

// Render a competition preview
function CompetitionView(props) {
    const startDate = new Date(props._creationTime).toLocaleDateString()
    return (
        <Card style={{ flexBasis: '300px' }} className="p-3">
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
                    <CardBody>
                        <p><GeoAlt /> {props.locationCategory}, {props.access}</p>
                        <p>${props.totalPrizeValue} in Prizes</p>
                        <h2><strong>32</strong> participants</h2>
                    </CardBody>
                </a>
            </Link>
        </Card>
    );
}

export default function App() {
    // Dynamically update `competitions` in response to the output of
    // `listCompetitions.ts`.
    const competitions = useQuery("listCompetitions") || [];
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <Container className="my-lg-4">
            <Head>
                <title>Browse Competitions</title>
            </Head>
            <Link href="/new-competition"><a className="btn btn-primary outline">Add Competition</a></Link>
            <h1 className="text-center">Competitions</h1>
            <FormGroup floating>
                <Input type="search" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} name="searchCompetitions" id="searchCompetitions" />
                <Label for="searchCompetitions">Search Competitions</Label>
            </FormGroup>
            <CardGroup className="my-3">
                {competitions.filter(item => item.name?.includes(searchQuery) || item.description?.includes(searchQuery)).map((competition) => (
                    <CompetitionView key={competition._id} {...competition} />
                ))}
            </CardGroup>
        </Container>
    );
}
