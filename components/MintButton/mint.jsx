export const mint = async () => {
  // Check if wallet is connected
  if (!provider) {
    toast.error('Connect your wallet')
    return
  }

  if (currentPhaseName !== 'PUBLIC' && currentPhaseName !== 'PREMINT') {
    if (userMintDetails.proofs.length === 0) {
      toast.error('You are not able to mint during this mint phase')
      return
    }
  }

  try {
    const currentProvider = new ethers.providers.Web3Provider(provider)
    const { ethereum } = window
    const signer = currentProvider.getSigner()
    if (ethereum) {
      const fcContract = new ethers.Contract(contractAddress, abi.abi, signer)
      let claimTx
      if (currentPhaseName === 'PUBLIC') {
        claimTx = await fcContract.purchase(mintQuantity, {
          // mintPhases[4] == public mint
          value: ethers.BigNumber.from(mintPhases[4]).mul(mintQuantity),
          gasLimit: 148000 + mintQuantity * 2000,
        })
      } else {
        claimTx = await fcContract.claim(
          mintQuantity,
          userMintDetails?.allowedMints,
          userMintDetails.proofs,
          {
            value: price,
            gasLimit: 148000 + mintQuantity * 2000,
          }
        )
      }

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
