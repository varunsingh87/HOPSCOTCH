import { Button, Container, List } from 'reactstrap'
import { Id } from '../../convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import TeamMembers from '../team/TeamMembers'
import CrossChat from './CrossChat'
import { useState } from 'react'

export default function CrossChatList(props: {
	competitionId: Id<'competitions'>
}) {
	const crossChats = useQuery(api.crosschat.listForUser, props)
	const [currentCrossChat, setCurrentCrossChat] = useState('')

	if (typeof crossChats == 'undefined') {
		return <h1>Loading...</h1>
	}

	return (
		<Container>
			{<Button onClick={() => setCurrentCrossChat('')}>{'<'}</Button>}
			{currentCrossChat ? <CrossChat joinRequestId={currentCrossChat as Id<'join_requests'>} /> : (
				<List>
					{crossChats.map(crossChat => (
						<li key={crossChat.joinRequest._id} className="d-block" onClick={() => setCurrentCrossChat(crossChat.joinRequest._id)}>
							<TeamMembers members={crossChat.teamMembers} />
						</li>
					))}
				</List>
			)}
		</Container>

	)
}