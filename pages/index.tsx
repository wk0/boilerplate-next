import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Web3Button } from '../components'
import { useWeb3Context } from '../context'
import abi from './abi.json'
import { ethers } from 'ethers'
import Axios from 'axios'

const Home: NextPage = () => {
  const [name, setName] = useState('World')
  const { provider } = useWeb3Context()
  const [status, setStatus] = useState('Waiting for interaction...')
  const contractAddress = '0x709e99C713d57E60d1Cf4A9E271989f1718780Ee'
  const wave = async () => {
    try {
      const currentProvider = new ethers.providers.Web3Provider(provider)
      console.log('currentProvider', currentProvider)
      const { ethereum } = window
      const signer = currentProvider.getSigner()

      if (ethereum) {
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          abi.abi,
          signer
        )

        let count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())

        /*
         * Execute the actual wave from your smart contract
         */
        const waveTxn = await wavePortalContract.wave()

        setStatus('Miners are at work...')
        await waveTxn.wait()
        count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())
        setStatus(`Total Contract Interactions: ${count.toNumber()}`)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get('http://localhost:3000/api/hello')
      if (response.status === 200 && response) {
        setName(response.data.name)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Web3 Next-Boilerplate</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full justify-end">
        <Web3Button />
      </div>

      <button
        className="mx-auto rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          wave()
        }}
      >
        Interact with the Contract, {name}!
      </button>
      <div className="mx-auto">{status}</div>
    </div>
  )
}

export default Home
