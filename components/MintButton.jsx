import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useWeb3Context } from '../context'
import abi from '../data/abi.json'

export const MintButton = ({ userMintDetails, currentPhaseName }) => {
  const { provider, address } = useWeb3Context()
  const contractAddress = '0x4d94E40DF0fa4237DaAaB0D69Fbe0Da9e69aC9A6' // TODO swap for mainnet address
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
      const mintedAmount = await contract.functions.numberMinted(address)
      // in case we get mintedAmount before userMintDetails, set to 0 instead of calculating a negative number
      if (userMintDetails?.allowedMints === 0) {
        setMintQuantity(0)
      } else {
        const remainingMints =
          userMintDetails?.allowedMints - Number(mintedAmount)
        setMintQuantity(remainingMints)
        setRemainingMints(remainingMints)
      }
    }
    getRemainingMints()
  }, [address, provider, userMintDetails?.allowedMints])

  const mint = async () => {
    // Check if wallet is connected
    if (!provider) {
      toast.error('Connect your wallet')
      return
    }

    if (userMintDetails.proofs.length === 0) {
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
          userMintDetails?.allowedMints,
          userMintDetails.proofs,
          {
            value: userMintDetails.pricePerToken * mintQuantity,
            gasLimit: 148000 + mintQuantity * 2000,
          }
        )
        setTxnHash(claimTx.hash)
        setStatus('Minting...')
        let tx = await claimTx.wait()
        setTxnHash(tx.hash)
        setStatus('Success!')
        setRemainingMints(remainingMints - mintQuantity)
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

  const renderMintMessage = () => {
    console.log(userMintDetails)
    if (userMintDetails.userPhase === currentPhaseName) {
      return (
        <div className="text-[#00ff3d]">MINTS AVAILABLE: {remainingMints}</div>
      )
    } else if (
      userMintDetails.allowedMints > 0 &&
      userMintDetails.userPhase !== currentPhaseName &&
      currentPhaseName !== 'PUBLIC'
    ) {
      return (
        <div className="mb-6 flex justify-between">
          <div>
            <span className="text-white">YOUR MINT PHASE: </span>
            <span className="text-[#00ff3d]">{userMintDetails.userPhase}</span>
          </div>
          <div className="ml-8">
            <span className="text-white">MINTS AVAILABLE: </span>
            <span className="text-[#00ff3d]">
              {userMintDetails.allowedMints}
            </span>
          </div>
        </div>
      )
    } else if (userMintDetails.userPhase == 'No Phase') {
      return (
        <div className="mb-2 text-gray-300">
          YOU ARE NOT ON THE ALLOWLIST. PLEASE WAIT FOR THE PUBLIC SALE.
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>{renderMintMessage()}</div>
      <div className="flex">
        {' '}
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
          className="mr-2 appearance-none rounded-md text-black"
        />
        <button
          className="mx-auto h-[52px] w-[200px] rounded-md bg-[#00ff3d] py-2 px-4 font-bold text-black hover:bg-green-400 disabled:bg-gray-300 disabled:opacity-70"
          onClick={() => {
            mint()
          }}
          disabled={
            mintQuantity === 0 ||
            (userMintDetails.userPhase !== currentPhaseName &&
              currentPhaseName !== 'PUBLIC')
          }
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
