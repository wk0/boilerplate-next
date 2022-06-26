import { ethers } from 'ethers'
export type Web3ProviderState = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: any
    web3Provider: ethers.providers.Web3Provider | null | undefined
    address: string | null | undefined
    network: ethers.providers.Network | null | undefined
    signer: any | null
    // connect: (() => Promise<void>) | null | undefined
    // disconnect: (() => Promise<void>) | null | undefined
}

export type web3ProviderAction = 
    | {
        type: "SET_WEB3_PROVIDER"
        payload: Web3ProviderState
      }
    | {
        type: "SET_WEB3_ADDRESS"
        payload: Web3ProviderState["address"]
    }
    | {
        type: "SET_WEB3_NETWORK"
        payload: Web3ProviderState["network"]
      }
    | {
        type: "RESET_WEB3_PROVIDER"
    }