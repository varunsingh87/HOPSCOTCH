import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { Card, CardGroup } from 'reactstrap'

export default function SubmissionsList(props) {
  const participants = useQuery(api.submission.listSubmissions, {
    competitionId: props.id,
  })
  return (
    <CardGroup>
      {participants?.map((participant) => (
        <Card>{JSON.stringify(participant)}</Card>
      ))}
    </CardGroup>
  )
}
