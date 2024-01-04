import { CardGroup, Container } from 'reactstrap'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import React from 'react'
import CompetitionView from './CompetitionView'

export default function ParticipatingCompetitions() {
  const ownCompetitions = useQuery(
    api.competition.listParticipatingCompetitions
  )
  return (
    <Container>
      <h2>Your Competitions</h2>
      <CardGroup className="my-3">
        {ownCompetitions?.map((item) => (
          <CompetitionView key={item.participation._id} {...item.competition} />
        ))}
      </CardGroup>
    </Container>
  )
}
