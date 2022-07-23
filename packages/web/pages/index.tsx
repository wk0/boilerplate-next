import type { NextPage } from 'next'
import Head from 'next/head'
import { Web3Address, Web3Balance, Web3Network } from '../components/'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Web3 Next-Boilerplate Mono</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grow p-8 text-center">
        <h1 className="pb-8 text-4xl font-bold">Home Page</h1>
        <Web3Address />
        <Web3Network />
        <Web3Balance />
      </main>

      <footer className="justify-end p-4">
        <p className="text-lg font-light">Footer</p>
      </footer>
    </div>
  )
}

export default Home
