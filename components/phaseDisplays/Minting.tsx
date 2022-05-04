import mintPhases from '../../data/phases'
import thumper from '../../assets/thumper.png'
import moment from 'moment-timezone'

export const Minting = ({ currentPhaseName }: { currentPhaseName: string }) => {
  if (!currentPhaseName) {
    return null
  }
  return (
    <div className="flex flex-col text-center">
      <div className="flex flex-col items-center">
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
                      phase.name === currentPhaseName
                        ? 'text-[#00ff3d]'
                        : 'opacity-60'
                    } mt-4 `}
                  >
                    {phase.name}
                  </div>
                  {phase.name === currentPhaseName ? (
                    <div className="text-xs text-white">MINTING NOW</div>
                  ) : (
                    <div className="text-xs opacity-80">
                      {moment(phase.startTimestamp)
                        .tz('America/New_York')
                        .format('M/D LT')}{' '}
                    </div>
                  )}
                </div>
              )
            }
          })}
        </div>
        <div className="mt-4 text-xs opacity-80">
          (Times shown in {moment().tz(moment.tz.guess()).format('z')})
        </div>
      </div>
      {currentPhaseName === 'PUBLIC' ? (
        ''
      ) : (
        <span className="whitespace-wrap mt-16 mb-8 text-lg text-[#00ff3d] sm:text-2xl">
          {currentPhaseName} PHASE ENDS IN:
        </span>
      )}
    </div>
  )
}
