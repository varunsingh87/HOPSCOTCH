import React from 'react'
import { Doc } from '../convex/_generated/dataModel'

export function UserBubble(sender: Doc<'users'>) {
  return (
    <img
      className="rounded-circle m-2"
      title={sender.name}
      src={sender.pictureURL}
      width={50}
      height={50}
      alt={'profile picture'}
    />
  )
}
