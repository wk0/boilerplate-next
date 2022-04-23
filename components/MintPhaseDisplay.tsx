export const MintPhaseDisplay = ({
  currentPhase,
  userPhase,
}: {
  currentPhase: string
  userPhase: string
}) => {
  const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Public']

  return (
    <div className="flex flex-col text-center">
      <div className="mx-4 flex ">
        {phases.map((phase, index) => {
          return (
            // return a circle with a label for each phase
            <div
              key={index}
              className="mx-4 flex flex-col items-center justify-start"
            >
              <div
                className={` h-8 w-8 rounded-full ${
                  phase === currentPhase ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
              <div>{phase}</div>
              {phase === userPhase ? (
                <div className="flex flex-col items-center justify-center">
                  <span>↑</span>
                  <span>Your Phase</span>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
      {userPhase === 'No Phase'
        ? 'You are not in the allowlist. Please wait for public sale'
        : null}
    </div>
  )
}
