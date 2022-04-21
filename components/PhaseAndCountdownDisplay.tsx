import { Countdown } from './Countdown'
import { MintPhaseDisplay } from './MintPhaseDisplay'
import { useMintPhases } from '../hooks/useMintPhases'

export const PhaseAndCountdownDisplay = ({}) => {
  const [mintPhases] = useMintPhases()
  // Get state from useMintPhases hook
  return (
    <div>
      <MintPhaseDisplay phase={1} />
      <Countdown time={'1 day'} />
    </div>
  )
}
