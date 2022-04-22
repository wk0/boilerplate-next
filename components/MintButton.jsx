import Axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWeb3Context } from '../context'
import abi from './abi.json'

export const MintButton = ({}) => {
  const [proof, setProof] = useState(null)
  const { provider } = useWeb3Context()
  const [status, setStatus] = useState('Waiting for interaction...')
  const contractAddress = '0x4d94E40DF0fa4237DaAaB0D69Fbe0Da9e69aC9A6'

  const mint = async () => {
    try {
      const currentProvider = new ethers.providers.Web3Provider(provider)
      const { ethereum } = window
      const signer = currentProvider.getSigner()

      if (ethereum) {
        const fcContract = new ethers.Contract(contractAddress, abi.abi, signer)
        let claimTx = await fcContract.claim(
          1,
          proof.allowedMints,
          proof.proofs,
          { value: 0, gasLimit: 2000000 }
        )
        console.log('claimTx', claimTx)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getClaimData = async () => {
      const response = await Axios.get('/api/claimproof', {
        params: { address: '0x8Bdd36BcC736806AEc967810513C27c9Da5EE8B3' },
      })
      if (response.status === 200 && response) {
        setProof(response.data)
      }
    }
    getClaimData()
  }, [])

  return (
    <button
      className="mx-auto rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      onClick={() => {
        mint()
      }}
    >
      Mint
    </button>
  )
}
