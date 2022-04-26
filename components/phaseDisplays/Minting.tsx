import mintPhases from '../../data/phases'
import thumper from '../../assets/thumper.png'

export const Minting = ({ currentPhaseName }: { currentPhaseName: string }) => {
  return (
    <div className="flex flex-col text-center">
      <div className="mx-4 flex ">
        {mintPhases.map((phase, index) => {
          if (index !== 0) {
            return (
              // return a circle with a label for each phase
              <div
                key={index}
                className="mx-2 flex flex-col items-center justify-start"
              >
                {phase.name === currentPhaseName ? (
                  <div
                    className="mx-2 h-12 w-12 rounded-full border-2 border-white sm:mx-8 sm:h-20 sm:w-20"
                    style={{
                      backgroundImage: `url("${thumper.src}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                ) : (
                  <div className="mx-4 h-12 w-12 rounded-full bg-gray-400 opacity-50 sm:mx-8 sm:h-20 sm:w-20"></div>
                )}

                <div
                  className={`${
                    phase.name === currentPhaseName ? '' : 'opacity-60'
                  } mt-4`}
                >
                  {phase.name}
                </div>
              </div>
            )
          }
        })}
      </div>
      <span className="whitespace-wrap mt-16 mb-8 text-lg text-[#00ff3d] sm:text-2xl">
        CURRENT MINTING PHASE ENDS IN:
      </span>
    </div>
  )
}
