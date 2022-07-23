import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ContextProvider } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
    </Web3ContextProvider>
  )
}

export default MyApp
