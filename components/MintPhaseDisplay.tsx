type MintPhaseDisplayPropz = {
  currentPhase: string
  userPhase: string
}

export const MintPhaseDisplay = ({
  currentPhase,
  userPhase,
}: MintPhaseDisplayPropz) => (
  <div className="">
    <div>Phase: {currentPhase ? currentPhase : 'Not minting right now..'}</div>
    <div className="">
      Your phase: {userPhase ? userPhase : 'Not minting right now..'}
    </div>
  </div>
)
