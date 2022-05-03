import { Etherscan } from './Etherscan'
import { MintMessage } from './MintMessage'
import { MintQuantity } from './MintQuantity'
import { useMint } from './useMint'

export const MintButton = ({ userMintDetails, currentPhaseName }) => {
  // const [mint, txnHash, status, remainingMints, mintQuantity, setMintQuantity] =
  //   useMint(userMintDetails, currentPhaseName)

  return (
    <div className="flex flex-col items-center justify-center">
      Test
      {/* <MintMessage
        userMintDetails={userMintDetails}
        currentPhaseName={currentPhaseName}
        remainingMints={remainingMints}
      />
      <div className="flex">
        <MintQuantity
          remainingMints={remainingMints}
          mintQuantity={mintQuantity}
          setMintQuantity={setMintQuantity}
        />
        <button
          className="mx-auto h-[52px] w-[200px] rounded-md bg-[#00ff3d] py-2 px-4 font-bold text-black hover:bg-green-400 disabled:bg-gray-300 disabled:opacity-70"
          onClick={() => {
            mint()
          }}
          disabled={
            mintQuantity === 0 ||
            (userMintDetails.userPhase !== currentPhaseName &&
              currentPhaseName !== 'PUBLIC')
          }
        >
          {status}
        </button>
      </div>
      <Etherscan txnHash={txnHash} /> */}
    </div>
  )
}
