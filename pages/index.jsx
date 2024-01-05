import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Col, CardGroup, Row, List, Container } from 'reactstrap'
import { useQuery } from 'convex/react'
import styles from '../styles/Home.module.css'
import { api } from '../convex/_generated/api'
import ParticipatingCompetitions from '../Components/ParticipatingCompetitions'
import CompetitionView from '../Components/CompetitionView'

export default function App(props) {
  // Dynamically update `competitions` in response to the output of
  // `listCompetitions.ts`.
  const competitions = useQuery(api.competition.listCompetitions)

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Browse Competitions</title>
      </Head>
      <h1 className="text-center">Competitions</h1>
      <Row>
        <Col lg="10">
          {props.authenticated ? <ParticipatingCompetitions /> : null}
          <h2>Browse Competitions</h2>
          <CardGroup className="my-3">
            {competitions
              ?.filter(
                (item) =>
                  !router.query.q ||
                  item.name?.includes(router.query.q) ||
                  item.description?.includes(router.query.q)
              )
              .map((competition) => (
                <CompetitionView key={competition._id} {...competition} />
              ))}
          </CardGroup>
        </Col>
        <Col lg="2">
          <Container className={styles.network}>
            <p>All Network Sites</p>
            <List type="unstyled">
              <li>
                <img width="20" src="/MusathonLogo.png" />
                <Link href="/musathons">Musathons</Link>
              </li>
              <li>
                <Link href="/hackathons">Hackathons</Link>
              </li>
              <li>
                <Link href="/bookathons">Bookathons</Link>
              </li>
              <li>
                <Link href="/filmathons">Filmathons</Link>
              </li>
              <li>
                <Link href="/ideathons">Ideathons</Link>
              </li>
            </List>
          </Container>
        </Col>
      </Row>
    </>
  )
}
