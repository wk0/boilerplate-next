import { useMintPhases } from '../hooks/useMintPhases'
import { Countdown } from './Countdown'
import { MintButton } from './MintButton'
import { Minting } from './phaseDisplays/Minting'
import { Premint } from './phaseDisplays/Premint'
import { useWeb3Context } from '../context'

export const PhaseAndCountdownDisplay = ({
  isCorrectNetwork,
  userMintDetails,
}) => {
  const [countdown, currentPhaseName] = useMintPhases()
  const { address } = useWeb3Context()
  if (currentPhaseName === '') {
    return <div className="text-4xl">Loading...</div>
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {currentPhaseName === 'PREMINT' ? (
        <Premint />
      ) : (
        <Minting currentPhaseName={currentPhaseName} />
      )}
      <Countdown time={countdown} />

      {address ? (
        <div>
          {isCorrectNetwork ? (
            <div className="mx-auto mt-24">
              <MintButton
                userMintDetails={userMintDetails}
                currentPhaseName={currentPhaseName}
              />
            </div>
          ) : (
            <span className="mt-12 px-4 text-center text-red-600">
              Switch to ETH Mainnet and refresh page to mint
            </span>
          )}
        </div>
      ) : (
        <div className="mt-12">Connect wallet to get started</div>
      )}
    </div>
  )
}
