import React from 'react'
import { useWeb3Context } from '../context'

export function Web3Button() {
  const { web3Provider, connect, disconnect, address } = useWeb3Context()

  return (
    <button
      className="m-4 rounded-lg bg-black py-2 px-4 font-bold text-white"
      onClick={() => {
        if (web3Provider) {
          disconnect()
        } else {
          connect()
        }
      }}
    >
      {web3Provider ? `${address}` : 'Connect'}
    </button>
  )
}
