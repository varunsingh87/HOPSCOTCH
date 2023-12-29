import classnames from 'classnames'
import { ConvexHttpClient } from 'convex/browser'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import {
  Container,
  Nav,
  Button,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import Rules from '../../Components/rules'
import SubmissionsList from '../../Components/submissionsList'
import Overview from '../../Components/overview'

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL
)

/**
 * @param props.id {string} The id of the competition
 * @param props.name {string}
 * @param props.thumbnail {string}
 */
export default function App(props) {
  const [activeTab, setActiveTab] = useState(1)

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const joinCompetition = useMutation(api.participant.joinCompetition)
  const participation = useQuery(api.participant.readParticipant, {
    competitionId: props.id,
  })

  return (
    <div>
      <Head>
        <title>{props.name} | Musathon</title>
      </Head>
      <Container className="text-center">
        <h2>{props.name}</h2>
        {participation ? (
          <Link
            href={`/submissions/new?competition=${props.id}`}
            className="btn btn-outline-primary"
          >
            Enter Submission
          </Link>
        ) : (
          <Button
            color="primary"
            onClick={() => joinCompetition({ id: props.id })}
          >
            Join Musathon
          </Button>
        )}
      </Container>

      <div className="mt-3">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 1 })}
              onClick={() => {
                toggle(1)
              }}
              style={{ cursor: 'pointer' }}
            >
              Overview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 2 })}
              onClick={() => {
                toggle(2)
              }}
              style={{ cursor: 'pointer' }}
            >
              Rules & Rubric
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 3 })}
              onClick={() => {
                toggle(3)
              }}
              style={{ cursor: 'pointer' }}
            >
              Prizes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 5 })}
              onClick={() => {
                toggle(5)
              }}
              style={{ cursor: 'pointer' }}
            >
              Music Gallery
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
            <Overview {...props} />
          </TabPane>
          <Rules />
          <TabPane tabId={3}>{JSON.stringify(props.prizeList)}</TabPane>
          <TabPane tabId={5}>
            <SubmissionsList id={props.id} />
          </TabPane>
        </TabContent>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  console.log('[getStaticProps]' + JSON.stringify(context))
  const competition = await convex.query(
    api.competition.getCompetition,
    context.params
  )

  return { props: { id: competition._id, ...competition } }
}

export async function getStaticPaths() {
  const competitions = await convex.query(api.competition.listCompetitions)
  //  console.log(competitions)
  return {
    paths: competitions.map((item) => {
      return {
        params: { id: item._id },
      }
    }),
    fallback: false,
  }
}
