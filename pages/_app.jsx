import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ConvexProvider, ConvexReactClient } from 'convex/react'
import clientConfig from "../convex/_generated/clientConfig";
const convex = new ConvexReactClient(clientConfig);

function MyApp({ Component, pageProps }) {
  return (
    <ConvexProvider client={convex}>
      <Component {...pageProps} />
    </ConvexProvider>
  )
}

export default MyApp
