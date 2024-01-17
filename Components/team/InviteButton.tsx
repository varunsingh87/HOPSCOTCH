import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { PersonFill, PersonPlus } from 'react-bootstrap-icons'

/**
 * Invite button for team joining in competitions
 * @param competitionId The competition in which this team switch request is getting made
 * @param inviter The team and user data corresponding to the user who is sending the invitation
 * @param joiner The user who is getting invited to a new team
 * @param teamOfJoiner The team of the joiner
 * @constructor
 */
export default function InviteButton({
  competitionId,
  joiner,
  teamOfJoiner,
}: {
  competitionId: Id<'competitions'>
  joiner: Doc<'users'>
  teamOfJoiner: any
}) {
  const invite = useMutation(api.participant.inviteToTeam)
  const [inviteButtonMessage, setInviteBtnMsg] = useState('Invite to Team')

  const [modal, setModal] = useState(false)
  const handleInviteClick = (joinerId: Id<'users'>) => {
    setModal(false)
    invite({ joinerId, competitionId })
    setInviteBtnMsg('Invite sent!')
  }
  const inviter = useQuery(api.participant.readParticipant, {
    competitionId,
  })

  const handleInviteModalOpen = () => {
    setModal(true)
  }

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button
        className="mt-2"
        color="primary"
        hidden={
          !inviter ||
          teamOfJoiner._id == inviter._id ||
          teamOfJoiner.members.length > 1
        }
        onClick={handleInviteModalOpen}
      >
        <PersonPlus />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Invite {joiner.name}</ModalHeader>
        <ModalBody>
          <Label>
            A polite, helpful message will help this participant decide if this
            team is a good fit
          </Label>
          <Input
            type="text"
            placeholder="Make sure to include contact information"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleInviteClick(joiner._id)}>
            Invite
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
