import { Button, Container } from 'reactstrap'
import Link from 'next/link'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useAlert } from '../AlertProvider'

export default function AuthenticatedCompetition(props) {
  const leaveCompetition = useMutation(api.participant.leaveCompetition)

  const [openModal] = useAlert()
  const joinCompetition = useMutation(api.participant.joinCompetition)

  const deleteCompetition = useMutation(api.competition.deleteCompetition)
  const participation = useQuery(api.participant.readParticipant, {
    competitionId: props.id,
  })
  const handleLeaveCompetitionClick = () => {
    openModal(
      'Are you sure you would like to leave the competition? You cannot rejoin after leaving, and repeated use of this may result in action against your account.',
      () => {
        leaveCompetition({ id: props.id })
      }
    )
  }
  return (
    <Container className="text-center">
      <h2>{props.name}</h2>
      {participation ? (
        <>
          <Link
            href={`/submissions/new?competition=${props.id}`}
            className="btn btn-outline-primary me-2"
          >
            Enter Submission
          </Link>
          <Button color="danger" onClick={handleLeaveCompetitionClick}>
            Leave Competition
          </Button>
        </>
      ) : (
        <Button
          color="primary"
          onClick={() => joinCompetition({ id: props.id })}
        >
          Join Musathon
        </Button>
      )}
      <Button
        onClick={() => {
          deleteCompetition({ id: props.id })
        }}
        className="btn btn-danger ms-3"
      >
        Delete Competition
      </Button>
    </Container>
  )
}
