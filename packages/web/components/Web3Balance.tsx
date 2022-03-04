import React, { useEffect, useCallback, useState } from 'react'
import { useWeb3Context } from '../context/'
import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

export function Web3Balance() {
  const { web3Provider, address } = useWeb3Context()
  const [balance, setBalance] = useState<string>('')

  useEffect(() => {
    if (web3Provider && address) {
      fetchBalance(web3Provider, address)
    } else {
      setBalance('')
    }
  }, [web3Provider, address])

  const fetchBalance = useCallback(
    async (web3Provider: ethers.providers.Web3Provider, address: string) => {
      const balance = await web3Provider.getBalance(address)
      setBalance(formatEther(balance))
    },
    []
  )

  return (
    <div className="flex items-center justify-center">
      <div className="border-grey md: w-full rounded-xl border sm:max-w-xl md:max-w-2xl">
        <div className="flex flex-row justify-between py-2 px-6">
          <span className="md:text-md text-left text-sm font-light lg:text-lg">
            Balance
          </span>
          <span className="md:text-md truncate pl-4 text-right text-sm  font-light lg:text-lg">
            {balance}
          </span>
        </div>
      </div>
    </div>
  )
}
