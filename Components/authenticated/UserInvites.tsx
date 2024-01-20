import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

export default function UserInvites(props: {
  competitionId: Id<'competitions'>
}) {
  const participant = useQuery(api.participant.readParticipant, {
    competitionId: props.competitionId,
  })
  if (!participant) return null
  return (
    <>
      <h1>Invites</h1>
    </>
  )
}
