import { ethers } from 'ethers'

const phases = ['TEAMS', 'ALLOWLIST', 'WAITLIST', 'PUBLIC']
export const MintMessage = ({
  userMintDetails,
  remainingMints,
  currentPhaseName,
  pricePerToken,
}) => {
  if (userMintDetails.userPhase === 'PUBLIC' && currentPhaseName !== 'PUBLIC') {
    return (
      <div className="mb-2 text-gray-300">
        You are not on any of our lists. PLEASE WAIT FOR THE PUBLIC SALE.
      </div>
    )
  } else if (
    phases.indexOf(userMintDetails.userPhase) <
      phases.indexOf(currentPhaseName) &&
    currentPhaseName !== 'PUBLIC'
  ) {
    return (
      <div className="mb-2 text-gray-300">
        {`Your mint phase (${userMintDetails.userPhase}) has passed, please wait for the public sale.`}
      </div>
    )
  } else if (
    userMintDetails.userPhase === 'PUBLIC' &&
    currentPhaseName === 'PUBLIC'
  ) {
    return (
      <div className="mb-6 flex justify-between whitespace-nowrap text-sm sm:text-base">
        <div>
          <span className="text-white">YOUR MINT PHASE: </span>
          <span className="text-[#00ff3d]">{userMintDetails.userPhase}</span>
        </div>
        <div className="ml-2 sm:ml-8">
          <span className="text-white">MINTS AVAILABLE: </span>
          <span className="text-[#00ff3d]">{remainingMints}</span>
        </div>
        <div className="ml-2 sm:ml-8">
          <span className="text-white">PRICE PER MINT: </span>
          <span className="text-[#00ff3d]">
            {`${ethers.utils.formatEther(pricePerToken)} ETH`}
          </span>
        </div>
      </div>
    )
  } else if (userMintDetails) {
    return (
      <div className="mb-6 flex justify-between whitespace-nowrap text-sm sm:text-base">
        <div>
          <span className="text-white">YOUR MINT PHASE: </span>
          <span className="text-[#00ff3d]">{userMintDetails.userPhase}</span>
        </div>
        <div className="ml-2 sm:ml-8">
          <span className="text-white">MINTS AVAILABLE: </span>
          <span className="text-[#00ff3d]">{remainingMints}</span>
        </div>
        <div className="ml-2 sm:ml-8">
          <span className="text-white">PRICE PER MINT: </span>
          <span className="text-[#00ff3d]">
            {`${ethers.utils.formatEther(pricePerToken)} ETH`}
          </span>
        </div>
      </div>
    )
  } else {
    return null
  }
}
