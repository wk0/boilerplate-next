import { useWeb3Context } from '../context'
import { useMintPhases } from '../hooks/useMintPhases'
import { Countdown } from './Countdown'
import { MintButton } from './MintButton'
import { Minting } from './phaseDisplays/Minting'
import { Premint } from './phaseDisplays/Premint'

export const PhaseAndCountdownDisplay = ({
  isCorrectNetwork,
  userMintDetails,
}) => {
  const [countdown, currentPhaseName] = useMintPhases()
  const { address } = useWeb3Context()
  // We should still display the countdown even if the !userMintDetails, so Loading... only shows when we don't know the current phase
  const renderMintButton = () => {
    if (address && !isCorrectNetwork) {
      return (
        <span className="text-2xl text-red-600">
          {`Switch to ${
            process.env.NEXT_PUBLIC_NEXT_ENV === 'development'
              ? 'Goerli Testnet'
              : 'ETH Mainnet'
          } and refresh page to mint`}
        </span>
      )
    }

    if (!currentPhaseName) {
      return <div>Loading..</div>
    }

    if (!userMintDetails || !address) {
      return <div className="text-2xl">Connect wallet to get started</div>
    }

    return (
      <MintButton
        userMintDetails={userMintDetails}
        currentPhaseName={currentPhaseName}
      />
    )
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {currentPhaseName === 'PREMINT' ? (
        <Premint />
      ) : (
        <Minting currentPhaseName={currentPhaseName} />
      )}
      <Countdown time={countdown} />
      <div className="mt-8">{renderMintButton()}</div>
    </div>
  )
}
