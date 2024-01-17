import { FormEvent, useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap'
import { GeoAlt, X } from 'react-bootstrap-icons'
import { useMutation } from 'convex/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { api } from '../convex/_generated/api'
import { Access } from '../lib/shared'

export default function App() {
  const router = useRouter()

  const [user, setUser] = useState('user name')
  useEffect(() => {
    const randomName = 'User ' + Math.floor(Math.random() * 10000)
    setUser(randomName)
  }, [])

  const [newCompetitionName, setNewCompetitionName] = useState('')
  const addCompetition = useMutation(api.competition.addCompetition)

  const [totalPrizeValue, setTotalPrizeValue] = useState(500)
  const [prizeList, setPrizeList] = useState([])
  const [locationCategory, setLocationCategory] = useState('Online')
  const [address, setAddress] = useState('')
  const [access, setAccess] = useState(Access.PUBLIC)
  const [description, setDescription] = useState('')
  const [rules, setRules] = useState('')

  async function handleAddCompetition(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNewCompetitionName('') // reset text entry box
    setAccess(Access.INITIAL)
    setLocationCategory('')
    setTotalPrizeValue(500)
    setPrizeList([])
    setDescription('')
    setRules('')
    await addCompetition({
      name: newCompetitionName,
      organizer: user,
      access,
      prizeList,
      address,
      description,
      locationCategory,
      totalPrizeValue,
      rules,
      thumbnail: 'https://picsum.photos/318/180',
    })
    await router.push('/')
  }

  return (
    <Container className="my-lg-4">
      <Head>
        <title>New Competition Wizard</title>
      </Head>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/">Competitions</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="#">New Competition</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col md className="col-6">
          <Form
            onSubmit={handleAddCompetition}
            className="justify-content-center"
          >
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                value={newCompetitionName}
                onChange={(event) => setNewCompetitionName(event.target.value)}
                className="form-control w-100"
                placeholder="Create a new musathon"
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label for="prize">Prize</Label>
              <Input
                type="number"
                min="0"
                max="300000"
                value={totalPrizeValue}
                placeholder="Total Prize Value"
                onChange={(e) => setTotalPrizeValue(parseInt(e.target.value))}
              />
            </FormGroup>

            <ListGroup>
              <ListGroupItem>
                Wolfram Alpha Pro Subscription <X onClick={() => {}} />
              </ListGroupItem>
              <ListGroupItem>Lifetime Taskade Upgrade</ListGroupItem>
              <ListGroupItem></ListGroupItem>
            </ListGroup>

            <FormGroup>
              <Label for="prizeList">
                Add Prize <input list="prizeList" name="prizeList" />
              </Label>
              <datalist id="prizeList">
                <option value="Wolfram Alpha Pro Subscription" />
                <option value="Lifetime Taskade Upgrade" />
                <option value="MLH Fellowship Fast Track" />
              </datalist>
            </FormGroup>
            <FormGroup>
              <Label for="locationCategory">Location</Label>
              <ButtonGroup className="w-100" id="locationCategory">
                <Button
                  outline
                  color="primary"
                  onClick={() => setLocationCategory('Online')}
                  active={locationCategory === 'Online'}
                >
                  Online
                </Button>
                <Button
                  outline
                  color="primary"
                  onClick={() => setLocationCategory('Hybrid')}
                  active={locationCategory === 'Hybrid'}
                >
                  Hybrid
                </Button>
                <Button
                  outline
                  color="primary"
                  onClick={() => setLocationCategory('In-Person')}
                  active={locationCategory === 'In-Person'}
                >
                  In-Person
                </Button>
              </ButtonGroup>
            </FormGroup>

            <FormGroup row className="my-lg-3 align-items-center">
              <Label className="w-auto" for="address">
                Address
              </Label>
              <Input
                type="text"
                id="location"
                value={address}
                disabled={locationCategory === 'Online'}
                onChange={(e) => setAddress(e.target.value)}
                className="w-50"
              />
            </FormGroup>

            <FormGroup row className="align-items-center">
              <Label className="w-auto" for="access">
                Access
              </Label>
              <ButtonGroup className="w-auto" id="access">
                <Button
                  outline
                  color="primary"
                  onClick={() => setAccess(Access.PUBLIC)}
                  active={access === Access.PUBLIC}
                >
                  Public
                </Button>
                <Button
                  outline
                  color="primary"
                  onClick={() => setAccess(Access.BY_APPLICATION)}
                  active={access === Access.BY_APPLICATION}
                >
                  By Application
                </Button>
                <Button
                  outline
                  color="primary"
                  onClick={() => setAccess(Access.INVITE_ONLY)}
                  active={access === Access.INVITE_ONLY}
                >
                  Invite Only
                </Button>
              </ButtonGroup>
            </FormGroup>

            <FormGroup>
              <Label for="rules">Rules and Rubric</Label>
              <textarea
                id="rules"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                className="form-control"
              />
            </FormGroup>

            <Input
              type="submit"
              value="Create"
              className="ms-2 btn btn-primary"
              disabled={!newCompetitionName}
            />
          </Form>
        </Col>
        <Col md className="col-6">
          <fieldset>
            <legend>Preview</legend>
            <h1 style={{ minHeight: '50px' }}>{newCompetitionName}</h1>
            <p>{description}</p>
            <p>${totalPrizeValue} in Prizes:</p>
            <p>
              <GeoAlt /> {locationCategory}{' '}
              {address && locationCategory !== 'Online' ? 'at ' + address : ''}
            </p>
            <p>{access}</p>
          </fieldset>
        </Col>
      </Row>
    </Container>
  )
}
