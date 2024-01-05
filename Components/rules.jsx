import { List, TabPane } from 'reactstrap'

export default function Rules(props) {
  return (
    <TabPane tabId={2}>
      <h3>Dates: September 2, 2022 - September 4, 2022</h3>

      <h3>Eligibility</h3>

      <p>
        Anyone who is interested in learning about music and jazz issues is
        eligible to join.
      </p>

      <h3>Project and Submission Requirements</h3>

      <p>
        Attach a Noteflight or FlatIO link to your project as well as a video
        presentation describing your product and its purpose. (max. 3 minutes)
      </p>
      <h3>Judging Criteria and Winner Selection:</h3>

      <List>
        <li>
          Uniqueness: Is the idea for the project creative and innovative?
        </li>
        <li>Design: Is the layout of the project well planned?</li>
        <li>
          Viability: Does the project demonstrate a real solution to a real
          problem?
        </li>
        <li>
          Potential Impact: Does the project have the potential to be expanded
          to a larger audience?
        </li>
        <li>
          Video Presentation: Is the developer(s) knowledgeable and confident
          about the technologies behind their project? Was the presentation
          clear and well-spoken?
        </li>
      </List>
    </TabPane>
  )
}
