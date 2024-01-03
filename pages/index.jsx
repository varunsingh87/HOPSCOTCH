import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GeoAlt } from 'react-bootstrap-icons'
import {
  Col,
  Card,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardTitle,
  Row,
  List,
  Container,
} from 'reactstrap'
import { useQuery } from 'convex/react'
import styles from '../styles/Home.module.css'
import classnames from 'classnames'
import { api } from '../convex/_generated/api'

// Render a competition preview
function CompetitionView(props) {
  const startDate = new Date(props._creationTime).toLocaleDateString()
  return (
    <Card
      className={classnames(
        'mb-5',
        'mx-2',
        'p-3',
        'rounded',
        'border',
        styles.competitionView
      )}
    >
      <Link
        href={`/competitions/${props._id}`}
        style={{ textDecoration: 'none', color: 'unset', display: 'block' }}
      >
        <CardImg
          alt="Card image cap"
          src={props.thumbnail || 'https://picsum.photos/318/181'}
        />
        <CardTitle tag="h2">{props.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {props.description || (
            <span style={{ fontStyle: 'italic' }}>No description provided</span>
          )}
        </CardSubtitle>
        <p>
          <GeoAlt /> {props.locationCategory}, {props.access}
          <br />${props.totalPrizeValue} in Prizes
          <br />
          <strong>{Math.round(Math.random() * 32) + 60}</strong> participants
        </p>
      </Link>
    </Card>
  )
}

export default function App() {
  // Dynamically update `competitions` in response to the output of
  // `listCompetitions.ts`.
  const competitions = useQuery(api.competition.listCompetitions)
  const ownCompetitions = useQuery(
    api.competition.listParticipatingCompetitions
  )
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Browse Competitions</title>
      </Head>
      <h1 className="text-center">Competitions</h1>
      <Row>
        <Col lg="10">
          <h2>Your Competitions</h2>
          <CardGroup className="my-3">
            {ownCompetitions?.map((item) => (
              <CompetitionView
                key={item.participation._id}
                {...item.competition}
              />
            ))}
          </CardGroup>
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
