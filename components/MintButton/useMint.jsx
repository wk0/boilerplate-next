import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useWeb3Context } from '../../context'
import abi from '../../data/abi.json'
import mintPhases from '../../data/phases'
import { contractAddress } from '../../helpers'

export const useMint = (userMintDetails, currentPhaseName) => {
  //   const { provider, address } = useWeb3Context()
  //   const [txnHash, setTxnHash] = useState(null)
  //   const [status, setStatus] = useState('Mint')
  //   const [mintQuantity, setMintQuantity] = useState(0)
  //   const [remainingMints, setRemainingMints] = useState(0)

  //   useEffect(() => {
  //     if (!provider) {
  //       return
  //     }
  //     const getRemainingMints = async () => {
  //       const currentProvider = new ethers.providers.Web3Provider(provider)
  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         abi.abi,
  //         currentProvider
  //       )
  //       let mintedAmount
  //       if (currentPhaseName === 'PUBLIC') {
  //         mintedAmount = await contract.functions.numberPurchased(address)
  //       } else {
  //         mintedAmount = await contract.functions.numberMinted(address)
  //       }

  //       if (currentPhaseName === 'PUBLIC') {
  //         // Public mint allowance is 3.
  //         const remainingMints = 3 - Number(mintedAmount)
  //         setMintQuantity(remainingMints)
  //         setRemainingMints(remainingMints)
  //       } else if (userMintDetails?.allowedMints === 0) {
  //         setMintQuantity(0)
  //       } else {
  //         const remainingMints =
  //           userMintDetails?.allowedMints - Number(mintedAmount)
  //         // this should never happen but adding it as a safeguard just in case.
  //         if (remainingMints < 0) {
  //           setMintQuantity(0)
  //         } else {
  //           setMintQuantity(remainingMints)
  //         }

  //         setRemainingMints(remainingMints)
  //       }
  //     }
  //     getRemainingMints()
  //   }, [address, provider])

  //   const price = ethers.BigNumber.from(userMintDetails.pricePerToken).mul(
  //     mintQuantity
  //   )
  //   const mint = async () => {
  //     // Check if wallet is connected
  //     if (!provider) {
  //       toast.error('Connect your wallet')
  //       return
  //     }

  //     if (currentPhaseName !== 'PUBLIC' && currentPhaseName !== 'PREMINT') {
  //       if (userMintDetails.proofs.length === 0) {
  //         toast.error('You are not able to mint during this mint phase')
  //         return
  //       }
  //     }

  //     try {
  //       const currentProvider = new ethers.providers.Web3Provider(provider)
  //       const { ethereum } = window
  //       const signer = currentProvider.getSigner()
  //       if (ethereum) {
  //         const fcContract = new ethers.Contract(contractAddress, abi.abi, signer)
  //         let claimTx
  //         if (currentPhaseName === 'PUBLIC') {
  //           claimTx = await fcContract.purchase(mintQuantity, {
  //             // mintPhases[4] == public mint
  //             value: ethers.BigNumber.from(mintPhases[4]).mul(mintQuantity),
  //             gasLimit: 148000 + mintQuantity * 2000,
  //           })
  //         } else {
  //           claimTx = await fcContract.claim(
  //             mintQuantity,
  //             userMintDetails?.allowedMints,
  //             userMintDetails.proofs,
  //             {
  //               value: price,
  //               gasLimit: 148000 + mintQuantity * 2000,
  //             }
  //           )
  //         }

  //         setTxnHash(claimTx.hash)
  //         setStatus('Minting...')
  //         let tx = await claimTx.wait()
  //         setTxnHash(tx.hash)
  //         setStatus('Success!')
  //         setRemainingMints(remainingMints - mintQuantity)
  //         setTimeout(() => {
  //           setStatus('Mint')
  //         }, 5000)
  //       } else {
  //         console.log("Ethereum object doesn't exist!")
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       setStatus('Failed')
  //       setTimeout(() => {
  //         setStatus('Mint')
  //       }, 5000)
  //     }
  //   }

  const mint = () => {
    console.log('test')
  }
  const txnHash = ''
  const remainingMints = 0
  const mintQuantity = 0
  const setMintQuantity = () => {
    console.log('test')
  }

  return [mint, txnHash, status, remainingMints, mintQuantity, setMintQuantity]
}
