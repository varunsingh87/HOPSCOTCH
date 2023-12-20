import classnames from 'classnames'
import { ConvexHttpClient } from 'convex/browser'
import { GenericId } from 'convex/values'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Col,
  Container,
  List,
  Nav,
  Input,
  Button,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

/**
 * @param props.id {string} The id of the competition
 * @param props.name {string}
 * @param props.thumbnail {string}
 */
export default function App(props) {
  const participants = useQuery(api.listParticipants.default, props)
  const [activeTab, setActiveTab] = useState(1)

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const [thumbnail, setThumbnail] = useState(props.thumbnail)
  const updateCompetitionThumbnail = useMutation(api.updateThumbnail.default)
  const deleteCompetition = useMutation(api.competition.deleteCompetition)

  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{props.name} | Musathon</title>
      </Head>
      <Container className="text-center">
        <h2>{props.name}</h2>
        <Link
          href={`/submissions/new?competition=${props.id}`}
          className="btn btn-outline-primary"
        >
          Enter Submission
        </Link>
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
              className={classnames({ active: activeTab === 4 })}
              onClick={() => {
                toggle(4)
              }}
              style={{ cursor: 'pointer' }}
            >
              Participants
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
            <Row>
              <Col sm="8">
                <p>{props.description}</p>
              </Col>
              <Col sm="4">
                <img src={props.thumbnail || ''} height="100" width="100" />
                <Input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  onKeyDown={(e) => {
                    console.info(e.key)
                    if (e.key === 'Enter') {
                      updateCompetitionThumbnail(
                        new GenericId('competitions', props.id),
                        thumbnail
                      )
                    }
                  }}
                >
                  {props.name}
                </Input>
                <Button
                  onClick={() => {
                    deleteCompetition(props.id)
                  }}
                  className="btn btn-danger"
                >
                  Delete Competition
                </Button>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId={2}>
            <h3>Dates: September 2, 2022 - September 4, 2022</h3>

            <h3>Eligibility</h3>

            <p>
              Anyone who is interested in learning about music and jazz issues
              is eligible to join.
            </p>

            <h3>Project and Submission Requirements</h3>

            <p>
              Attach a Noteflight or FlatIO link to your project as well as a
              video presentation describing your product and its purpose. (max.
              3 minutes)
            </p>
            <h3>Judging Criteria and Winner Selection:</h3>

            <List>
              <li>
                Uniqueness: Is the idea for the project creative and innovative?
              </li>
              <li>Design: Is the layout of the project well planned?</li>
              <li>
                Viability: Does the project demonstrate a real solution to a
                real problem?
              </li>
              <li>
                Potential Impact: Does the project have the potential to be
                expanded to a larger audience?
              </li>
              <li>
                Video Presentation: Is the developer(s) knowledgeable and
                confident about the technologies behind their project? Was the
                presentation clear and well-spoken?
              </li>
            </List>
          </TabPane>
          <TabPane tabId={3}>{JSON.stringify(props.prizeList)}</TabPane>
          <TabPane tabId={4}>{JSON.stringify(participants)}</TabPane>
        </TabContent>
      </div>
    </div>
  )
}

//export async function getStaticProps(context) {
//  const competition = useQuery(
//    api.competition.getCompetition,
//    context.params.id
//  )
//  competition.id = competition._id = competition._id.id
//
//  return { props: competition }
//}
//
//export async function getStaticPaths() {
//  const competitions = await useQuery(api.competition.listCompetitions)
//  return {
//    paths: competitions.map((item) => {
//      return {
//        params: { id: item._id.id },
//      }
//    }),
//    fallback: false,
//  }
//}
