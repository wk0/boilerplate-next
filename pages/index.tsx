import type { NextPage } from 'next'
import Head from 'next/head'
import { Web3Button } from '../components'
import { MintButton } from '../components/MintButton'
import { PhaseAndCountdownDisplay } from '../components/PhaseAndCountdownDisplay'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Fear City Mint</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
      </Head>
      <div className="flex w-full justify-end">
        <Web3Button />
      </div>

      <PhaseAndCountdownDisplay />
      <div className="mx-auto mt-24">
        <MintButton />
      </div>
    </div>
  )
}

export default Home
