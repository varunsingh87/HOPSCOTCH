import {api} from '../convex/_generated/api'
import {ConvexHttpClient} from 'convex/browser'
import {Id} from '../convex/_generated/dataModel'
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next'

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL || ''
)

export const Competition = {
    routes: async function () {
        const competitions = await convex.query(api.competition.listCompetitions)

        return {
            paths: competitions.map((item) => {
                return {
                    params: {id: item._id},
                }
            }),
            fallback: false,
        }
    } satisfies GetStaticPaths,
    page: async function (context: GetStaticPropsContext) {
        if (!context.params) {
            return {
                notFound: true,
            }
        }

        const competition = await convex.query(api.competition.getCompetition, {
            id: context.params.id as Id<'competitions'>,
        })

        if (!competition) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                id: competition._id,
                ...competition,
            },
        }
    } satisfies GetStaticProps,
}
