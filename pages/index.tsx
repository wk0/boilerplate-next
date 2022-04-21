import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Web3Button } from '../components'
import { useWeb3Context } from '../context'
import abi from './abi.json'
import { ethers } from 'ethers'
import Axios from 'axios'
import { useMintPhases } from '../hooks/useMintPhases'
import { MintPhaseDisplay } from '../components/MintPhaseDisplay'
import { PhaseAndCountdownDisplay } from '../components/PhaseAndCountdownDisplay'

const Home: NextPage = () => {
  const [proof, setProof] = useState(null)
  const { provider } = useWeb3Context()
  const [status, setStatus] = useState('Waiting for interaction...')
  const contractAddress = '0xe0ef181fBCa2a0376d448833CAEeb60da3aB4f33'

  // const wave = async () => {
  //   try {
  //     const currentProvider = new ethers.providers.Web3Provider(provider)
  //     const { ethereum } = window
  //     const signer = currentProvider.getSigner()

  //     if (ethereum) {
  //       const fcContract = new ethers.Contract(contractAddress, abi.abi, signer)
  //       console.log(1000000000000000, 1, proof.allowedMints, proof.proofs)
  //       let response = await fcContract.claim(
  //         1000000000000000,
  //         1,
  //         proof.allowedMints,
  //         proof.proofs
  //       )
  //       console.log('contract response', response)
  //     } else {
  //       console.log("Ethereum object doesn't exist!")
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   const getClaimData = async () => {
  //     const response = await Axios.get('/api/claimproof', {
  //       params: { address: contractAddress },
  //     })
  //     if (response.status === 200 && response) {
  //       setProof(response.data)
  //     }
  //   }
  //   getClaimData()
  // }, [])

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Web3 Next-Boilerplate</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
      </Head>
      <div className="flex w-full justify-end">
        <Web3Button />
      </div>
      <PhaseAndCountdownDisplay />
      <button
        className="mx-auto rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          // wave()
        }}
      >
        Mint
      </button>
    </div>
  )
}

export default Home
