import Axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Web3Button } from '../components'
import { MintButton } from '../components/MintButton'
import { PhaseAndCountdownDisplay } from '../components/PhaseAndCountdownDisplay'

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
  const [mintAmount, setMintAmount] = useState(0)
  useEffect(() => {
    const getuserMintDetails = async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      await Axios.get('/api/claimproof', {
        params: { address: accounts[0] },
      })
        .then((res) => {
          setuserMintDetails(res.data.mintDetails),
            setMintAmount(res.data.mintDetails.allowedMints)
        })
        .catch((err) => console.log(err))
    }
    getuserMintDetails()
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Fear City Mint</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
      </Head>
      <div className="flex w-full justify-end">
        <Web3Button />
      </div>

      <PhaseAndCountdownDisplay userPhase={userMintDetails.userPhase} />
      <div className="mx-auto mt-24">
        <MintButton userMintDetails={userMintDetails} />
      </div>
    </div>
  )
}

export default Home
