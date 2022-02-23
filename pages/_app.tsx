import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        autoClose={2000}
      />
    </>
  )
}

export default MyApp
