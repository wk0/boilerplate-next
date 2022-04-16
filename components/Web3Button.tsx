import React from 'react'
import { useWeb3Context } from '../context'

export function Web3Button() {
  const { web3Provider, connect, disconnect, address } = useWeb3Context()

  interface ButtonProps {
    callback: (() => Promise<void>) | null
  }

  const Button = ({ callback }: ButtonProps) => {
    return callback ? (
      <button
        className="group m-4 rounded-lg bg-black py-2 px-4 font-bold text-white hover:bg-gray-700"
        onClick={callback}
      >
        {web3Provider ? (
          <div className="">
            <span className="group-hover:hidden">{`${address?.substring(
              0,
              5
            )}...${address?.substring(address.length - 4)}`}</span>
            <span className="hidden group-hover:block">Disconnect?</span>
          </div>
        ) : (
          'Connect Wallet'
        )}
      </button>
    ) : (
      <button>Loading...</button>
    )
  }

  return <Button callback={web3Provider ? disconnect : connect} />
}
