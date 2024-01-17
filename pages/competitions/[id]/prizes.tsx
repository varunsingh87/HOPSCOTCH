import CompetitionNavbar from '../../../Components/CompetitionNavbar'
import { Competition } from '../../../lib/client'
import Head from 'next/head'

export default function CompetitionPrizes(props: any) {
  return (
    <CompetitionNavbar {...props} tabId={3}>
      <Head>
        <title>Prizes</title>
      </Head>
      {JSON.stringify(props.prizeList)}
    </CompetitionNavbar>
  )
}

export const getStaticPaths = Competition.routes
export const getStaticProps = Competition.page
