import { Countdown } from './Countdown'
import { MintPhaseDisplay } from './MintPhaseDisplay'
import { useMintPhases } from '../hooks/useMintPhases'

export const PhaseAndCountdownDisplay = ({ userPhase }) => {
  const [countdown, currentPhaseName] = useMintPhases()

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <MintPhaseDisplay phase={currentPhaseName} userPhase={userPhase} />
      {currentPhaseName === 'Public' ? '' : <Countdown time={countdown} />}
    </div>
  )
}
