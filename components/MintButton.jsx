import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useWeb3Context } from '../context'
import abi from '../data/abi.json'

export const MintButton = ({ userMintDetails }) => {
  const { provider } = useWeb3Context()
  const contractAddress = '0x4d94E40DF0fa4237DaAaB0D69Fbe0Da9e69aC9A6'
  const [txnHash, setTxnHash] = useState(null)
  const [status, setStatus] = useState('Mint')
  // const [numberMinted, setNumberMinted] = useState(0)
  const [mintQuantity, setMintQuantity] = useState(0)
  const [remainingMints, setRemainingMints] = useState(0)
  useEffect(() => {
    if (!provider) {
      return
    }
    const getRemainingMints = async () => {
      const currentProvider = new ethers.providers.Web3Provider(provider)
      const contract = new ethers.Contract(
        contractAddress,
        abi.abi,
        currentProvider
      )
      const mintedAmount = await contract.functions.balanceOf(
        '0x8Bdd36BcC736806AEc967810513C27c9Da5EE8B3'
      )
      // in case we get mintedAmount before userMintDetails, set to 0 instead of calculating a negative number
      if (userMintDetails.allowedMints === 0) {
        setMintQuantity(0)
      } else {
        const remainingMints =
          userMintDetails.allowedMints - Number(mintedAmount)
        setMintQuantity(remainingMints)
        setRemainingMints(remainingMints)
      }
    }
    getRemainingMints()
  }, [provider, userMintDetails])

  const mint = async () => {
    // Check if wallet is connected
    if (!provider) {
      toast.error('Connect your wallet')
      return
    }

    if (!userMintDetails) {
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
          mintQuantity,
          userMintDetails.allowedMints,
          userMintDetails.proofs,
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
          max={remainingMints}
          placeholder="Enter amount"
          value={mintQuantity}
          step="1"
          min="0"
          onChange={(e) => {
            setMintQuantity(e.target.value)
          }}
          // background grey
          className="appearance-none bg-gray-700 "
        />
        <button
          className="mx-auto rounded bg-green-600 py-2 px-4 font-bold text-white hover:bg-green-400"
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
