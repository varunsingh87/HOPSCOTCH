import { Col, List, ListInlineItem, Row } from 'reactstrap'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import InvitesAndJoinRequests from './authenticated/UserInvites'
import InviteButton from './team/InviteButton'
import JoinRequestButton from './team/JoinRequestButton'
import Chat from './Chat'

export default function Teams(props: any) {
  const teamList = useQuery(api.team.list, props)
  const { isAuthenticated } = useConvexAuth()
  const sendMessage = useMutation(api.crosschat.sendMessage)
  const listMessages = useMutation(api.crosschat.listMessages, {

  })

  return (
    <Row>
      <Col md={3}>
        {isAuthenticated ? (
          <InvitesAndJoinRequests competitionId={props.competitionId} />
        ) : null}
      </Col>
      <Col md={5}>
        <h1>All Teams</h1>
        <List className="p-0">
          {teamList?.map((team) => (
            <li key={team._id} className="border p-2 m-1 list-unstyled">
              <List className="mb-4">
                {team.members.map((member) => (
                  <ListInlineItem>
                    <img
                      src={member.pictureURL}
                      width={50}
                      alt={'Profile picture of ' + member.name}
                    />{' '}
                    {member.name}
                    {isAuthenticated ? (
                      <InviteButton
                        competitionId={props.competitionId}
                        joiner={member}
                        teamOfJoiner={team}
                      />
                    ) : null}
                  </ListInlineItem>
                ))}
              </List>
              {isAuthenticated ? (
                <JoinRequestButton
                  competitionId={props.competitionId}
                  teamId={team._id}
                />
              ) : null}
            </li>
          ))}
        </List>
      </Col>
      <Col md={4}>
        <h1>Chat</h1>
        <Chat sendMessage={newMessage => sendMessage({message: newMessage})}
              messages={} />
      </Col>
    </Row>
  )
}
