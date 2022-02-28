import React, { ReactChild, createContext, useContext } from 'react'
import { useWeb3 } from '../hooks/Web3Client'
import { Web3ProviderState, web3InitialState } from '../reducers'

const Web3Context = createContext<Web3ProviderState>(web3InitialState)

interface Props {
  children: ReactChild
}

export const Web3ContextProvider = ({ children }: Props) => {
  const web3ProviderState = useWeb3()

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3Context() {
  return useContext(Web3Context)
}
