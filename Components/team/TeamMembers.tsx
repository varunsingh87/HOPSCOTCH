import { List, ListInlineItem } from 'reactstrap'
import type { Doc } from '../../convex/_generated/dataModel'

export default function TeamMembers({
  members,
}: {
  members: Array<Doc<'users'>>
}) {
  return (
    <List className="mb-4">
      {members.map((member) => (
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
  )
}
