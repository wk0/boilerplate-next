export const Etherscan = ({ txnHash }) => {
  return (
    <>
      {txnHash ? (
        <a
          href={`https://${
            process.env.NEXT_PUBLIC_NEXT_ENV === 'development' ? 'goerli.' : ''
          }etherscan.io/tx/${txnHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 text-blue-500 underline"
        >{`View your transaction on Etherscan: ${txnHash?.substring(
          0,
          5
        )}...${txnHash?.substring(txnHash.length - 4)}`}</a>
      ) : null}
    </>
  )
}
