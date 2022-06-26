import { useEffect, useReducer, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setWeb3Provider } from "../store/web3Provider/web3Action";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import API from '../common/api'
import { DataToSign } from '../common/types'
import {
  Web3Action,
  web3InitialState,
  web3Reducer,
} from '../context/reducers'
import { Web3ProviderState } from '../store/web3Provider/web3Types'
import { web3ProviderAction } from '../store/web3Provider/web3Action'
import { StoreState } from '../store/store'

import { toast } from 'react-toastify'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  }
}

let web3Modal: Web3Modal | null
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
    theme: {
      background: "rgb(39, 49, 56)",
      main: "rgb(199, 199, 199)",
      secondary: "rgb(136, 136, 136)",
      border: "rgba(195, 195, 195, 0.14)",
      hover: "rgb(16, 26, 32)"
    }
  })
}

export const useWeb3 = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState)
  const web3ProviderState = useSelector((state:any) => state.web3Provider);
  const dispatchReduxAction = useDispatch();
  const { provider, web3Provider, address, network } = state

  const connect = useCallback(async () => {
    if (web3Modal) {
      return;
      try {
        const provider = await web3Modal.connect() //metamask , coinbase ...
        const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
        const signer = await web3Provider.getSigner()
        const network = await web3Provider.getNetwork()
        const address = await signer.getAddress()
        toast.success('Connected to Web3');
        toast.info('正在登入NFT BOT')
        const postBody: DataToSign = {
          address,
          network:network.name //需驗證此為主網路
        }
        const loginResponse = await API.POST('/api/user/login',postBody,signer);
        console.log('loginResponse :', loginResponse);
        // if(loginResponse.status!=="200"){
        //   toast.error('登入NFT BOT失敗，請重新登入');
        // }
        const newWeb3Provider : Web3ProviderState = {
          provider,
          web3Provider,
          address,
          signer,
          network
        }

        dispatch({
          type: 'SET_WEB3_PROVIDER',
          provider,
          web3Provider,
          address,
          signer,
          network,
        } as Web3Action)

        dispatchReduxAction(setWeb3Provider({
          type: 'SET_WEB3_PROVIDER',
          payload: newWeb3Provider
        } as web3ProviderAction))

      } catch (e) {
        console.log('connect error', e)
      }
    } else {
      console.error('No Web3Modal')
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      toast.error('Disconnected from Web3')
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      } as Web3Action)

      dispatchReduxAction(setWeb3Provider({
        type: 'RESET_WEB3_PROVIDER',
      } as web3ProviderAction))

    } else {
      console.error('No Web3Modal')
    }
  }, [provider])

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info('Changed Web3 Account')
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        } as Web3Action)

        dispatchReduxAction(setWeb3Provider({
          type: 'SET_ADDRESS',
          payload:{address: accounts[0]},
        } as web3ProviderAction))
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== 'undefined') {
          console.log('switched to chain...', _hexChainId)
          toast.info('Web3 Network Changed')
          window.location.reload()
        } else {
          console.log('window is undefined')
        }
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return {
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
  } as Web3ProviderState
}
