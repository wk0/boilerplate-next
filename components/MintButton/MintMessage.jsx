export const MintMessage = ({
  userMintDetails,
  currentPhaseName,
  remainingMints,
}) => {
  if (
    userMintDetails?.userPhase === currentPhaseName ||
    currentPhaseName === 'PUBLIC'
  ) {
    return (
      <div className="text-[#00ff3d]">MINTS AVAILABLE: {remainingMints}</div>
    )
  } else if (
    userMintDetails.allowedMints > 0 &&
    userMintDetails?.userPhase !== currentPhaseName &&
    currentPhaseName !== 'PUBLIC'
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
      </div>
    )
  } else if (userMintDetails.userPhase == 'No Phase') {
    return (
      <div className="mb-2 text-gray-300">
        YOU ARE NOT ON THE ALLOWLIST. PLEASE WAIT FOR THE PUBLIC SALE.
      </div>
    )
  } else {
    return null
  }
}
