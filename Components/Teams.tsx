import { Button, Col, List, ListInlineItem, Row } from 'reactstrap'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { useState } from 'react'

export default function Teams(props: any) {
  const teamList = useQuery(api.team.list, props)
  const participant = useQuery(api.participant.readParticipant, props)
  const requestJoin = useMutation(api.participant.requestJoin)
  const [joinButtonMessage, setJoinButtonMessage] = useState('Join Team')

  return (
    <Row>
      <Col md={6}></Col>
      <Col md={6}>
        <List className="p-0">
          {teamList?.map((item) => (
            <li key={item._id} className="border p-2 m-1 list-unstyled">
              <List className="mb-4">
                {item.members.map((member) => (
                  <ListInlineItem>
                    <img
                      src={member.pictureURL}
                      width={50}
                      alt={'Profile picture of ' + member.name}
                    />{' '}
                    {member.name}
                  </ListInlineItem>
                ))}
              </List>
              <Button
                hidden={
                  participant && participant.userMembership.team == item._id
                }
                disabled={!participant}
                color="primary"
                onClick={() => {
                  requestJoin({ id: item._id })
                  setJoinButtonMessage('Join requested!')
                }}
              >
                {joinButtonMessage}
              </Button>
            </li>
          ))}
        </List>
      </Col>
    </Row>
  )
}
