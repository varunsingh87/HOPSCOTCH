import classnames from 'classnames'
import {ConvexHttpClient} from 'convex/browser'
import Head from 'next/head'
import {useState} from 'react'
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {useConvexAuth} from 'convex/react'
import {api} from '../../convex/_generated/api'
import Rules from '../../Components/rules'
import SubmissionsList from '../../Components/submissionsList'
import Overview from '../../Components/overview'
import AuthenticatedCompetition from '../../Components/authenticated/Competition'
import {GetStaticPaths, GetStaticProps} from "next";
import {Id} from "../../convex/_generated/dataModel";
import Teams from "../../Components/Teams";

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL || ''
)

/**
 * @param props.id {string} The id of the competition
 * @param props.name {string} The name of the competition
 * @param props.thumbnail {string} The thumbnail of the competition
 */
export default function App(props: any) {
    const [activeTab, setActiveTab] = useState(1)
    const {isAuthenticated} = useConvexAuth()

    const toggle = (tab: number) => {
        if (activeTab !== tab) setActiveTab(tab)
    }

    return (
        <div>
            <Head>
                <title>{props.name} | Musathon</title>
            </Head>

            {isAuthenticated ? <AuthenticatedCompetition {...props} /> : null}
            <div className="mt-3">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === 1})}
                            onClick={() => {
                                toggle(1)
                            }}
                            style={{cursor: 'pointer'}}
                        >
                            Overview
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === 2})}
                            onClick={() => {
                                toggle(2)
                            }}
                            style={{cursor: 'pointer'}}
                        >
                            Rules & Rubric
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === 3})}
                            onClick={() => {
                                toggle(3)
                            }}
                            style={{cursor: 'pointer'}}
                        >
                            Prizes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: activeTab === 4})}
                                 onClick={() => toggle(4)}
                                 style={{cursor: 'pointer'}}>
                            Find Teammates
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === 5})}
                            onClick={() => {
                                toggle(5)
                            }}
                            style={{cursor: 'pointer'}}
                        >
                            Music Gallery
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                        <Overview {...props} />
                    </TabPane>
                    <TabPane tabId={2}>
                        <Rules/>
                    </TabPane>
                    <TabPane tabId={3}>{JSON.stringify(props.prizeList)}</TabPane>
                    <TabPane tabId={4}>
                        <Teams competitionId={props.id}/>
                    </TabPane>
                    <TabPane tabId={5}>
                        <SubmissionsList id={props.id}/>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    )
}

export const getStaticProps = (async (context) => {
    if (!context.params) {
        return {
            notFound: true
        }
    }

    const competition = await convex.query(
        api.competition.getCompetition,
        {id: context.params.id as Id<'competitions'>}
    )

    if (!competition) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            id: competition._id, ...competition
        }
    }
}) satisfies GetStaticProps

export const getStaticPaths = (async () => {
    const competitions = await convex.query(api.competition.listCompetitions)

    return {
        paths: competitions.map((item) => {
            return {
                params: {id: item._id},
            }
        }),
        fallback: false,
    }
}) satisfies GetStaticPaths
