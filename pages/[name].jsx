import { useMutation, useQuery } from "../convex/_generated/react"

export default function App(props) {

}

export function getStaticPaths() {
    const competitions = useMutation("listCompetitions")
    return {
        paths: [
            competitions.map(item => {
                return { params: item }
            })
        ]
    }
}