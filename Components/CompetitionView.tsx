import { Card, CardImg, CardSubtitle, CardTitle } from 'reactstrap'
import classnames from 'classnames'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { GeoAlt } from 'react-bootstrap-icons'

/**
 * Renders a competition preview
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function CompetitionView(props: any): JSX.Element {
  // const startDate = new Date(props._creationTime).toLocaleDateString()
  return (
    <Card
      className={classnames(
        'mb-5',
        'mx-2',
        'p-3',
        'rounded',
        'border',
        styles.competitionView
      )}
    >
      <Link
        href={`/competitions/${props._id}`}
        style={{ textDecoration: 'none', color: 'unset', display: 'block' }}
      >
        <CardImg
          alt="Card image cap"
          src={props.thumbnail || 'https://picsum.photos/318/181'}
        />
        <CardTitle tag="h2">{props.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {props.description || (
            <span style={{ fontStyle: 'italic' }}>No description provided</span>
          )}
        </CardSubtitle>
        <p>
          <GeoAlt /> {props.locationCategory}, {props.access}
          <br />${props.totalPrizeValue} in Prizes
          <br />
          <strong>{Math.round(Math.random() * 32) + 60}</strong> participants
        </p>
      </Link>
    </Card>
  )
}
