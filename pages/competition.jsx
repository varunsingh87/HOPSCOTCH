import { useEffect, useState } from "react";
import { Card, CardBody, CardGroup, CardTitle, Container } from "reactstrap";
import { useMutation, useQuery } from "../convex/_generated/react";
import Head from "next/head"
import Link from "next/link";

// Render a competition preview
function CompetitionView(props) {
    const startDate = new Date(props._creationTime).toLocaleDateString()
    return (
        <Card outline>
            <CardTitle>{startDate}: {props.name}</CardTitle>
            <CardBody>
                <p>Check out {props.name}!</p>
                <p>${props.prize} in Prizes</p>
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
        <Container>
            <Head>
                <title>Browse Competitions</title>
            </Head>

            <h1 className="text-center">Competitions</h1>
            <p className="text-center">
                <span className="badge bg-dark">{name}</span>
            </p>
            <CardGroup className="list-group shadow-sm my-3">
                {competitions.slice(-10).map((competition) => (
                    <CompetitionView key={competition._id} {...competition} />
                ))}
            </CardGroup>
            <Link href="/new-competition">Add Competition</Link>
        </Container>
    );
}
