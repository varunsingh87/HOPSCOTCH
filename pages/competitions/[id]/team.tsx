import {Button, Col, Container, Input, List, Row} from 'reactstrap'
import {useMutation, useQuery} from 'convex/react'
import {api} from '../../../convex/_generated/api'
import {Id} from "../../../convex/_generated/dataModel";
import {GetStaticPaths, GetStaticProps} from "next";
import {ConvexHttpClient} from "convex/browser";
import React, {useState} from "react";

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL || ''
)

export default function Team(props: any) {
    const teamInfo = useQuery(api.team.get, {competitionId: props.id})
    const sendMessage = useMutation(api.team.sendMessage)
    const [newMessage, setNewMessage] = useState('')

    if (!teamInfo) {
        return (
            <Container>
                You must join the competition to be on a team
            </Container>
        )
    }

    return (
        <Container>
            <h1>Team Dashboard</h1>
            <Row>
                <Col className="border" md={6}>
                    <List className="p-2">
                        {teamInfo.members.map(item => (
                            <li className="border list-unstyled">{item._id} {item.user}</li>
                        ))}
                    </List>
                </Col>
                <Col md={6} className="border">
                    <List className="p-0 mt-2">
                        {teamInfo.messages.map(item => <li
                            className="border p-2 list-unstyled">{item.message}</li>)}
                    </List>
                    <Input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}/>
                    <Button className="my-2" color="primary"
                            onClick={() => sendMessage({teamId: teamInfo._id, message: newMessage})}>Chat</Button>
                </Col>
            </Row>
        </Container>
    )
}

export const getStaticProps = (async (context) => {
    if (!context.params) {
        return {
            notFound: true
        }
    }

    const competition = await convex.query(
        api.competition.getCompetition,
        {id: context.params.id as Id<'competitions'>}
    )

    if (!competition) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            id: competition._id, ...competition
        }
    }
}) satisfies GetStaticProps

export const getStaticPaths = (async () => {
    const competitions = await convex.query(api.competition.listCompetitions)
    //  console.log(competitions)
    return {
        paths: competitions.map((item) => {
            return {
                params: {id: item._id},
            }
        }),
        fallback: false,
    }
}) satisfies GetStaticPaths
