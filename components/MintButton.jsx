import Axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWeb3Context } from '../context'
import { toast } from 'react-toastify'
import abi from '../data/abi.json'
import Link from 'next/link'

export const MintButton = ({}) => {
  const [mintAmount, setMintAmount] = useState(0)
  const [proof, setProof] = useState(null)
  const { provider } = useWeb3Context()
  const contractAddress = '0x4d94E40DF0fa4237DaAaB0D69Fbe0Da9e69aC9A6'
  const [txnHash, setTxnHash] = useState(null)
  const [status, setStatus] = useState('Mint')
  console.log('proof', proof)
  useEffect(() => {
    const getProof = async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      await Axios.get('/api/claimproof', {
        params: { address: accounts[0] },
      })
        .then((res) => {
          setProof(res.data), setMintAmount(res.data.allowedMints)
        })
        .catch((err) => console.log(err))
    }
    getProof()
  }, [])

  const mint = async () => {
    // Check if wallet is connected
    if (!provider) {
      toast.error('Connect your wallet')
      return
    }

    if (!proof) {
      toast.error('You are not able to mint during this mint phase')
      return
    }

    try {
      const currentProvider = new ethers.providers.Web3Provider(provider)
      const { ethereum } = window
      const signer = currentProvider.getSigner()
      if (ethereum) {
        const fcContract = new ethers.Contract(contractAddress, abi.abi, signer)
        let claimTx = await fcContract.claim(
          mintAmount,
          proof.allowedMints,
          proof.proofs,
          { value: 0, gasLimit: 2000000 }
        )
        setTxnHash(claimTx.hash)
        setStatus('Minting...')
        let tx = await claimTx.wait()
        setTxnHash(tx.hash)
        setStatus('Success!')
        setTimeout(() => {
          setStatus('Mint')
        }, 5000)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
      setStatus('Failed')
      setTimeout(() => {
        setStatus('Mint')
      }, 5000)
    }
  }

  return (
    <div className="flex flex-col">
      <div>
        <input
          type="number"
          placeholder="Enter amount"
          value={mintAmount}
          onChange={(e) => {
            setMintAmount(e.target.value)
          }}
        />
        <button
          className="mx-auto rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            mint()
          }}
        >
          {status}
        </button>
      </div>

      {txnHash ? (
        <a
          href={`https://etherscan.io/tx/${txnHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >{`View your transaction on Etherscan: ${txnHash?.substring(
          0,
          5
        )}...${txnHash?.substring(txnHash.length - 4)}`}</a>
      ) : null}
    </div>
  )
}
