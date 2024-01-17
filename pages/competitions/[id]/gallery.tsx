import CompetitionNavbar from '../../../Components/CompetitionNavbar'
import SubmissionsList from '../../../Components/submissionsList'
import { Competition } from '../../../lib/client'
import Head from 'next/head'

export default function CompetitionGallery(props: any) {
  return (
    <CompetitionNavbar tabId={5} {...props}>
      <Head>
        <title>Submission Gallery</title>
      </Head>
      <SubmissionsList id={props.id} />
    </CompetitionNavbar>
  )
}

export const getStaticPaths = Competition.routes
export const getStaticProps = Competition.page
