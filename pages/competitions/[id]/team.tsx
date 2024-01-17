import { Button, Col, List, Row } from 'reactstrap'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import React from 'react'
import TeamMembers from '../../../Components/team/TeamMembers'
import Chat from '../../../Components/Chat'
import { UserBubble } from '../../../Components/User'
import Head from 'next/head'
import CompetitionNavbar from '../../../Components/CompetitionNavbar'
import { Competition } from '../../../lib/client'
import Link from 'next/link'

export default function Team(props: any) {
  const teamInfo = useQuery(api.team.get, { competitionId: props.id })
  const acceptJoin = useMutation(api.participant.inviteToTeam)

  const handleAcceptJoin = (joinerId: Id<'users'>) => {
    acceptJoin({
      joinerId,
      competitionId: props.id,
    })
  }

  return (
    <CompetitionNavbar {...props} tabId={6}>
      <Head>
        <title>My Team</title>
      </Head>
      <h1>Team Dashboard</h1>
      <Row>
        <Col md={6}>
          {teamInfo ? <TeamMembers members={teamInfo.members} /> : null}
        </Col>
        <Col md={6} className="border">
          <h2>Join Requests</h2>
          <List className="p-2">
            {teamInfo?.joinRequests.map((request) => (
              <li className="border list-unstyled">
                <UserBubble {...request.user} />
                <p>{request.pitch}</p>
                <Button onClick={() => handleAcceptJoin(request.user._id)}>
                  Accept
                </Button>
              </li>
            ))}
          </List>
          <h2>Pending Invitations</h2>
          <List className="p-2">
            {teamInfo?.invitations.map((invitation) => (
              <li className="border list-unstyled p-2">
                <UserBubble {...invitation.user} />
                <span>{invitation.user.name}</span>
                <Button className="float-end m-2" color="warning">
                  Revoke
                </Button>
                <p>{invitation.pitch}</p>
              </li>
            ))}
          </List>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Submission</h2>
          <Link
            href={`/submissions/new?competition=${props.id}`}
            className="btn btn-outline-primary me-2"
          >
            Enter Submission
          </Link>
        </Col>
        <Col md={6} className="border">
          {teamInfo ? (
            <Chat id={teamInfo._id} messages={teamInfo.messages} />
          ) : null}
        </Col>
      </Row>
    </CompetitionNavbar>
  )
}

export const getStaticProps = Competition.page
export const getStaticPaths = Competition.routes
