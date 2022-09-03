import { useRouter } from "next/router"
import { ConvexHttpClient } from "convex/browser";
import clientConfig from "../../convex/_generated/clientConfig";
import Head from "next/head"
import { TabPane, Tab } from "reactstrap"

const convex = new ConvexHttpClient(clientConfig);

export default function App(props) {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{props.name} | Musathon</title>
            </Head>
            <h1>{props.name}</h1>
            <TabPane></TabPane>
        </div>
    )
}

export async function getStaticProps(context) {
    const competition = await convex.query("getCompetition")(context.params.id)
    competition.id = competition._id = competition._id.id

    return { props: competition }
}

export async function getStaticPaths() {
    const competitions = await convex.query("listCompetitions")();
    return {
        paths: competitions.map(item => {
            return {
                params: { id: item._id.id }
            }
        }),
        fallback: false
    }
}