import Axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import homebg from '../assets/homebg.png'
import logo from '../assets/logo.png'
import { Web3Button } from '../components'
import { PhaseAndCountdownDisplay } from '../components/PhaseAndCountdownDisplay'
import { Soldout } from '../components/phaseDisplays/Soldout'
import { useWeb3Context } from '../context'
import { ethers } from 'ethers'
import { contractAddress } from '../helpers'
import abi from '../data/abi.json'

const Home = () => {
  const { provider, address } = useWeb3Context()
  const [isCorrectNetwork, setCorrectNetwork] = useState(false)
  const [userMintDetails, setuserMintDetails] = useState()
  const [soldout, setSoldout] = useState(false)
  useEffect(() => {
    const checkCorrectNetwork = async () => {
      if (!address) {
        console.log('Wallet is not connected')
        return
      }
      const { ethereum } = window
      let chainId = await ethereum.request({
        method: 'eth_chainId',
        rpcUrls: provider.rpcUrl,
      })
      // get node env
      const nodeEnv = process.env.NEXT_PUBLIC_NEXT_ENV
      if (nodeEnv === 'development') {
        setCorrectNetwork(chainId === '0x5')
      } else if (nodeEnv === 'production') {
        setCorrectNetwork(chainId === '0x1')
      }
    }
    const getuserMintDetails = async () => {
      await Axios.get('/api/claimproof', {
        params: { address: address?.toLowerCase() },
      })
        .then((res) => {
          setuserMintDetails(res.data.mintDetails)
        })
        .catch((err) => console.log(err))
    }

    const getTotalSupply = async () => {
      if (provider) {
        const currentProvider = new ethers.providers.Web3Provider(provider)
        const contract = new ethers.Contract(
          contractAddress,
          abi.abi,
          currentProvider
        )
        const totalSupply = await contract.functions.totalSupply()
        if (Number(totalSupply) === 9999) {
          setSoldout(true)
        }
      }
    }
    checkCorrectNetwork()
    if (isCorrectNetwork && address) {
      getuserMintDetails()
      getTotalSupply()
    }
  }, [address, provider, provider?.rpcUrl, isCorrectNetwork])

  return (
    <div
      className="home flex h-screen flex-col items-center justify-center  text-white"
      style={{
        backgroundImage: `url("${homebg.src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Head>
        <title>Fear City Mint</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
      </Head>
      <div className="absolute top-8 right-8">
        <Web3Button />
      </div>
      <div className="absolute top-8 left-8">
        <Image src={logo} alt="logo" layout="fixed" height={64} width={109.8} />
      </div>
      {soldout ? (
        <Soldout />
      ) : (
        <PhaseAndCountdownDisplay
          userMintDetails={userMintDetails}
          isCorrectNetwork={isCorrectNetwork}
        />
      )}
    </div>
  )
}

export default Home
