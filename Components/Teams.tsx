import {
  Button,
  Col,
  Input,
  Label,
  List,
  ListInlineItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { useState } from 'react'
import InvitesAndJoinRequests from './authenticated/UserInvites'
import { Id } from '../convex/_generated/dataModel'

export default function Teams(props: any) {
  const teamList = useQuery(api.team.list, props)
  const participant = useQuery(api.participant.readParticipant, props)
  const requestJoin = useMutation(api.participant.requestJoin)
  const invite = useMutation(api.participant.inviteToTeam)
  const [joinButtonMessage, setJoinButtonMessage] = useState('Join Team')
  const [inviteButtonMessage, setInviteBtnMsg] = useState('Invite to Team')

  const handleJoinClick = (id: Id<'teams'>) => {
    setRequestJoinModal(false)
    requestJoin({ id })
    setJoinButtonMessage('Join requested!')
  }

  const handleJoinModalOpen = () => {
    setRequestJoinModal(true)
  }

  const [modal, setModal] = useState(false)
  const [requestJoinModal, setRequestJoinModal] = useState(false)

  const handleInviteClick = (joinerId: Id<'users'>) => {
    setModal(false)
    invite({ joinerId, competitionId: props.competitionId })
    setInviteBtnMsg('Invite sent!')
  }

  const handleInviteModalOpen = () => {
    setModal(true)
  }

  const toggle = () => setModal(!modal)

  const toggleJoinRequestModal = () => setRequestJoinModal(!requestJoinModal)

  return (
    <Row>
      <Col md={6}>
        <InvitesAndJoinRequests />
      </Col>
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
                    <Button
                      className="ms-2"
                      color="primary"
                      hidden={
                        participant &&
                        participant.userMembership.team == item._id
                      }
                      onClick={handleInviteModalOpen}
                    >
                      {inviteButtonMessage}
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>
                        Invite {member.name}
                      </ModalHeader>
                      <ModalBody>
                        <Label>
                          A polite, helpful message will help this participant
                          decide if this team is a good fit
                        </Label>
                        <Input
                          type="text"
                          placeholder="Make sure to include contact information"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => handleInviteClick(member.user._id)}
                        >
                          Invite
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <Modal
                      isOpen={requestJoinModal}
                      toggle={toggleJoinRequestModal}
                    >
                      <ModalHeader toggle={toggleJoinRequestModal}>
                        Request to Join
                      </ModalHeader>
                      <ModalBody>
                        <Label>
                          Pitch your skills and interests to this team to
                          persuade them to let you join them
                        </Label>
                        <Input
                          type="text"
                          placeholder="Make sure to include contact information"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => handleJoinClick(item._id)}
                        >
                          Join
                        </Button>{' '}
                        <Button
                          color="secondary"
                          onClick={toggleJoinRequestModal}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </ListInlineItem>
                ))}
              </List>
              <Button
                hidden={
                  participant && participant.userMembership.team == item._id
                }
                disabled={!participant}
                color="primary"
                onClick={handleJoinModalOpen}
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
