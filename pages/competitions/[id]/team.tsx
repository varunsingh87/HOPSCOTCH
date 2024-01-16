import {Button, Col, Container, List, Row} from 'reactstrap'
import {useConvexAuth, useMutation, useQuery} from 'convex/react'
import {api} from '../../../convex/_generated/api'
import {Id} from "../../../convex/_generated/dataModel";
import {GetStaticPaths, GetStaticProps} from "next";
import {ConvexHttpClient} from "convex/browser";
import React from "react";
import TeamMembers from "../../../Components/team/TeamMembers";
import Chat from "../../../Components/Chat";
import {UserBubble} from "../../../Components/User";

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL || ''
)

export default function Team(props: any) {
    const teamInfo = useQuery(api.team.get, {competitionId: props.id})
    const acceptJoin = useMutation(api.participant.inviteToTeam)
    const {isAuthenticated} = useConvexAuth()

    if (!teamInfo) {
        return (
            <Container>
                You must join the competition to be on a team
            </Container>
        )
    }

    if (!isAuthenticated) {
        return (
            <Container>
                You must be signed in to view your team
            </Container>
        )
    }

    const handleAcceptJoin = (joinerId: Id<'users'>) => {
        acceptJoin({
            joinerId,
            competitionId: props.id
        })
    }

    return (
        <Container>
            <h1>Team Dashboard</h1>
            <Row>
                <Col className="border" md={6}>
                    <TeamMembers members={teamInfo.members}/>
                </Col>
                <Col md={6} className="border">
                    <h2>Join Requests</h2>
                    <List className="p-2">
                        {teamInfo.joinRequests.map(request => (
                            <li className="border list-unstyled">
                                <UserBubble {...request.user} />
                                {request.teamConsent ? "Team Consent" : ""}
                                {request.userConsent ? "User Consent" : ""}
                                <Button onClick={() => handleAcceptJoin(request.user._id)}>Accept</Button>
                            </li>
                        ))}
                    </List>
                </Col>
            </Row>
            <Row>
                <Col md={6}></Col>
                <Col md={6} className="border">
                    <Chat id={teamInfo._id} messages={teamInfo.messages}/>
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
