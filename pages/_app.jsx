import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ConvexProviderWithAuth0 } from 'convex/react-auth0'
import { Auth0Provider } from '@auth0/auth0-react'
import { Layout } from '../Components/layout'
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react'
import { Login } from '../lib/account-auth'

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_URL
)

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: typeof location !== 'undefined' ? location.origin : '',
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ConvexProviderWithAuth0 client={convex}>
        <Authenticated>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Authenticated>
        <Unauthenticated>
          <Login />
        </Unauthenticated>
        <AuthLoading>Loading...</AuthLoading>
      </ConvexProviderWithAuth0>
    </Auth0Provider>
  )
}

export default MyApp
