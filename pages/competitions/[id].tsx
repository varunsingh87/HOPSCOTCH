import Head from 'next/head'
import Overview from '../../Components/overview'
import CompetitionNavbar from '../../Components/CompetitionNavbar'
import { Competition } from '../../lib/client'

/**
 * @param props.id {string} The id of the competition
 * @param props.name {string} The name of the competition
 * @param props.thumbnail {string} The thumbnail of the competition
 */
export default function App(props: any) {
  return (
    <div>
      <Head>
        <title>{props.name} | Musathon</title>
      </Head>

      <CompetitionNavbar {...props} tabId={1}>
        <Overview {...props} />
      </CompetitionNavbar>
    </div>
  )
}

export const getStaticProps = Competition.page
export const getStaticPaths = Competition.routes
