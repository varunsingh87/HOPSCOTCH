import CompetitionNavbar from '../../../Components/CompetitionNavbar'
import Teams from '../../../Components/Teams'
import { Competition } from '../../../lib/client'
import Head from 'next/head'

export default function CompetitionTeams(props: any) {
  return (
    <CompetitionNavbar tabId={4} {...props}>
      <Head>
        <title>Teams</title>
      </Head>
      <Teams competitionId={props.id} />
    </CompetitionNavbar>
  )
}

export const getStaticPaths = Competition.routes
export const getStaticProps = Competition.page
