import Web3 from 'web3'
import { default as Web3Type } from 'web3/types'
import { Sign } from 'web3-core/types'

// const rpcURL: string = process.env['rpcURL'] as string
// let web3Object: Web3Type = new Web3();
// if (typeof web3Object !== 'undefined') {
//     web3Object = new Web3(web3Object.currentProvider);
//   } else {
//     web3Object = new Web3(rpcURL);
// }
export interface DataToSign {
  address: string | null
  whaleAdress?: string | null
}

export const getSignature = async (
  dataToSign: DataToSign,
  address: string,
  provider: any
): Promise<string> => {
  const web3Object = new Web3(provider);
  const sign_result = await web3Object.eth.sign(
      JSON.stringify(dataToSign),
      address
      )
  return sign_result
}

export const getSignature2 = async (
    dataToSign: DataToSign,
    signer: any,
  ): Promise<string> => {
    const sign_result = await signer.signMessage( JSON.stringify(dataToSign))
    return sign_result
  }

// export default web3Object
