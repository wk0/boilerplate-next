import Axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Web3Button } from '../components'
import { MintButton } from '../components/MintButton'
import { PhaseAndCountdownDisplay } from '../components/PhaseAndCountdownDisplay'
import logo from '../assets/logo.png'
import Image from 'next/image'

interface IuserMintDetails {
  userPhase: string
  allowedMints: number
  pricePerToken: number
  proofs: Array<string>
}

const Home: NextPage = () => {
  const [userMintDetails, setuserMintDetails] = useState<IuserMintDetails>({
    userPhase: '',
    allowedMints: 0,
    pricePerToken: 0,
    proofs: [],
  })

  useEffect(() => {
    const getuserMintDetails = async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      await Axios.get('/api/claimproof', {
        params: { address: accounts[0] },
      })
        .then((res) => {
          setuserMintDetails(res.data.mintDetails)
        })
        .catch((err) => console.log(err))
    }
    getuserMintDetails()
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Fear City Mint</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
      </Head>

      <div className="absolute top-4 right-4">
        <Web3Button />
      </div>

      <div className="w-[200px]">
        <Image src={logo} alt="logo" />
      </div>

      <PhaseAndCountdownDisplay userPhase={userMintDetails.userPhase} />
      <div className="mx-auto mt-24">
        <MintButton userMintDetails={userMintDetails} />
      </div>
    </div>
  )
}

export default Home
