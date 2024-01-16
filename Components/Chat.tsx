import { Button, Input, List } from 'reactstrap'
import React, { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'
import { Id } from '../convex/_generated/dataModel'
import { UserBubble } from './User'
import classnames from 'classnames'

export default function Chat(props: { id: Id<'teams'>; messages: Array<any> }) {
  const sendMessage = useMutation(api.team.sendMessage)
  const [newMessage, setNewMessage] = useState('')

  return (
    <>
      <h1>Team Chat</h1>
      <List className="p-0 mt-2">
        {props.messages.map((item) => (
          <li
            className={classnames(
              'p-2',
              'list-unstyled',
              'd-flex',
              item.ownMessage ? 'flex-row-reverse align-items-end' : ''
            )}
          >
            <UserBubble {...item.sender} />
            <p className="border p-1 rounded mx-2">{item.message}</p>
          </li>
        ))}
      </List>
      <Input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button
        className="my-2"
        color="primary"
        onClick={() => sendMessage({ teamId: props.id, message: newMessage })}
      >
        Chat
      </Button>
    </>
  )
}
