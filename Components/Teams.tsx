import { Col, List, ListInlineItem, Row } from 'reactstrap'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import InvitesAndJoinRequests from './authenticated/UserInvites'
import InviteButton from './team/InviteButton'
import JoinRequestButton from './team/JoinRequestButton'

export default function Teams(props: any) {
  const teamList = useQuery(api.team.list, props)
  const { isAuthenticated } = useConvexAuth()

  return (
    <Row>
      <Col md={6}>
        {isAuthenticated ? (
          <InvitesAndJoinRequests competitionId={props.competitionId} />
        ) : null}
      </Col>
      <Col md={6}>
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
    </Row>
  )
}
