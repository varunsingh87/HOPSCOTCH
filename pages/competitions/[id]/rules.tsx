import Rules from '../../../Components/rules'
import CompetitionNavbar from '../../../Components/CompetitionNavbar'
import { Competition } from '../../../lib/client'
import Head from 'next/head'

export default function CompetitionRules(props: any) {
  return (
    <CompetitionNavbar {...props} tabId={2}>
      <Head>
        <title>Competition Rules</title>
      </Head>
      <Rules />
    </CompetitionNavbar>
  )
}

export const getStaticPaths = Competition.routes
export const getStaticProps = Competition.page
