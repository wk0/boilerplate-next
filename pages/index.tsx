import Axios from 'axios'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Web3Button } from '../components'
import { PhaseAndCountdownDisplay } from '../components/PhaseAndCountdownDisplay'
import { useWeb3Context } from '../context'
import abi from './abi.json'
import { MintButton } from '../components/MintButton'
const { formatUnits } = ethers.utils

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
      <MintButton />
    </div>
  )
}

export default Home
