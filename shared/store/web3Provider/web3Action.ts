import { ethers } from 'ethers'
import { Web3ProviderState,web3ProviderAction } from './web3Types'

/**
 * 將web3Provider存到redux裡
 * @param { Web3ProviderState["address"]} payload - Web3ProviderState
 */
export const setWeb3Provider = (payload: Web3ProviderState["address"]) => async (dispatch:any) => {
  try {
    dispatch({
      type: "SET_WEB3_ADDRESS",
      payload: payload,
    } as web3ProviderAction);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: "error message",
    });
  }
};

/**
 * 設定web3的address
 * @param {ethers.providers.Network} payload - Web3ProviderState
 */
 export const setWeb3Adress = (payload: ethers.providers.Network) => async (dispatch:any) => {
  try {
    dispatch({
      type: "SET_WEB3_ADDRESS",
      payload: payload,
    } as web3ProviderAction);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: "error message",
    });
  }
};