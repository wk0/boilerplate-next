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
        className="group h-8 rounded-lg bg-[#00ff3d] py-2 px-4 text-sm font-bold text-black hover:bg-green-600 sm:h-[52px] sm:text-base"
        onClick={callback}
      >
        {web3Provider ? (
          <div className="">
            {address ? (
              <>
                <span className="group-hover:hidden">{` ${address?.substring(
                  0,
                  5
                )}...${address?.substring(address.length - 4)}`}</span>
                <span className="hidden group-hover:block">Disconnect?</span>
              </>
            ) : (
              <span>Connect Wallet</span>
            )}
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
