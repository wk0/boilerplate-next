type MintPhaseDisplayProps = {
  phase: string | number
}

export const MintPhaseDisplay = ({ phase }: MintPhaseDisplayProps) => (
  <div>Phase: {phase ? phase : 'Not minting right now..'}</div>
)
