import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { Button, Card, CardBody } from 'reactstrap'
import TeamMembers from '../team/TeamMembers'

export default function UserInvites(props: {
  competitionId: Id<'competitions'>
}) {
  const invites = useQuery(api.participant.readInvites, {
    competitionId: props.competitionId,
  })
  const acceptInvite = useMutation(api.participant.requestJoin);

  if (!invites) return null;
  return (
    <>
      <h1>Invites</h1>
      {invites.map(team => (
        <Card>
          <CardBody>
            <ul>
              <TeamMembers members={team.teammates.map(teammate => teammate.user)} />
            </ul>
            <Button color="primary" onClick={() => acceptInvite({ id: team._id })}>Accept Invite</Button>
          </CardBody>
        </Card>

      ))}
    </>
  )
}
