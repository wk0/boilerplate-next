export const MintQuantity = ({
  remainingMints,
  mintQuantity,
  setMintQuantity,
}) => {
  return (
    <input
      type="number"
      max={remainingMints}
      placeholder="Enter amount"
      value={mintQuantity}
      step="1"
      min="0"
      onChange={(e) => {
        // only allow up to remaining mints
        const quantity =
          e.target.value > remainingMints ? remainingMints : e.target.value
        setMintQuantity(quantity)
      }}
      // background grey
      className="mr-2 appearance-none rounded-md text-black"
    />
  )
}
