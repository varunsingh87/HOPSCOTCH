import React, { useState, useEffect } from 'react'
import { Check, Pencil } from 'react-bootstrap-icons'
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap'
import { useQuery, useMutation, useConvexAuth } from 'convex/react'
import { api } from '../convex/_generated/api'

function SubmissionViewer() {
  return (
    <Card>
      <CardImg
        src="https://www.aboutbritain.com/images/articles/big/medieval-knights-shutterstock-trio-92785621.jpg"
        class="card-img-top"
        height="100px"
        top
        width="auto"
        style={{ objectFit: 'cover' }}
      />
      <CardBody>
        <h5 className="card-title">Medieval Chant</h5>
        <p className="card-text">
          Encapsulates the spirit of the most noble and bravest knights.
        </p>
      </CardBody>
      <CardFooter>
        <small className="text-muted">
          Last updated {Math.round(Math.random() * 5)} mins ago
        </small>
      </CardFooter>
    </Card>
  )
}

function SubmissionsList() {
  return (
    <Row class="row-cols-1 row-cols-md-3 g-4">
      <Col>
        <SubmissionViewer />
      </Col>
    </Row>
  )
}

export default function Profile() {
  const { isAuthenticated } = useConvexAuth()
  const user = useQuery(api.user.getUser)
  const [bio, setBio] = useState('Loading Bio...')
  const storeUser = useMutation(api.user.storeUser)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (user?.bio !== undefined) {
      setBio(user.bio)
    }
  }, [user])

  async function saveBio() {
    await storeUser({ bio })
  }

  // TODO: Base on NoteFlight profile page: https://www.noteflight.com/profile/e747973656d52d4b41ebe1ff8ebf1cbc8792d7f7

  if (!isAuthenticated) {
    return <p>Log in first</p>
  }

  return (
    <div className="m-3">
      <div className="d-flex flex-row mb-4">
        <img
          alt=""
          src="https://picsum.photos/300/300"
          width="200"
          height="200"
          className="rounded-circle float-start pt-3"
        />
        <div className="d-flex flex-column ms-5 me-auto">
          <h1 className="display-1 mb-3">{user?.name}</h1>

          <h2>About</h2>
          {!editMode ? (
            <p>{bio}</p>
          ) : (
            <textarea
              style={{ resize: 'none' }}
              value={bio}
              rows={10}
              cols={75}
              onChange={(e) => setBio(e.target.value)}
              className="p-3"
            />
          )}
          <h2>Social</h2>
          <Form className="d-flex flex-wrap">
            <Col md="6" className="pe-3">
              <FormGroup>
                <Label for="noteflight">Noteflight</Label>
                <InputGroup>
                  <InputGroupText>
                    https://www.noteflight.com/profile/
                  </InputGroupText>
                  <Input className="form-control" id="noteflight" />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="6" className="pe-3">
              <FormGroup>
                <Label for="flatio">FlatIO</Label>
                <InputGroup>
                  <InputGroupText>https://www.flat.io/@</InputGroupText>
                  <Input className="form-control" id="flatio" />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="8" className="pe-3">
              <FormGroup>
                <Label for="youtube">YouTube</Label>
                <InputGroup>
                  <InputGroupText>
                    https://www.youtube.com/channel/
                  </InputGroupText>
                  <Input className="form-control" id="youtube" />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="4" className="pe-3">
              <FormGroup>
                <Label>Website</Label>
                <Input />
              </FormGroup>
            </Col>
          </Form>
        </div>
        {!editMode ? (
          <Pencil onClick={() => setEditMode(true)} className="m-3" />
        ) : (
          <Check onClick={() => setEditMode(false)} className="m-3" />
        )}
      </div>
      <SubmissionsList />
    </div>
  )
}
