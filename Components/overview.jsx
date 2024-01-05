import { Col, Input, Row } from 'reactstrap'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'

export default function Overview(props) {
  const updateCompetitionThumbnail = useMutation(
    api.competition.updateThumbnail
  )
  const [thumbnail, setThumbnail] = useState(props.thumbnail)

  return (
    <Row>
      <Col sm="8">
        <p>{props.description}</p>
      </Col>
      <Col sm="4">
        <img src={props.thumbnail || ''} alt="" height="100" width="100" />
        <Input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          onKeyDown={(e) => {
            console.info(e.key)
            if (e.key === 'Enter') {
              updateCompetitionThumbnail(props.id, thumbnail)
            }
          }}
        >
          {props.name}
        </Input>
      </Col>
    </Row>
  )
}
