import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

export function Login() {
  const { isLoading, loginWithRedirect } = useAuth0()
  if (isLoading) {
    return <button className="btn btn-primary">Loading...</button>
  }
  return (
    <button className="btn btn-primary" onClick={() => loginWithRedirect({})}>
      Log in
    </button>
  )
}

export function Logout() {
  const router = useRouter()
  const { logout } = useAuth0()
  return (
    <div className="float-end">
      {/* We know this component only renders if the user is logged in. */}
      <img
        onClick={() => router.push('/profile')}
        src="https://picsum.photos/300/300"
        alt=""
        width="35"
        height="35"
        className="rounded-circle float-start me-3"
      />
      <button
        className="btn btn-secondary float-end"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log out
      </button>
    </div>
  )
}
