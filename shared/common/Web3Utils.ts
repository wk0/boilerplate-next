import Web3 from 'web3'
import { default as Web3Type } from 'web3/types'
import { Sign } from 'web3-core/types'

const rpcURL: string = process.env['rpcURL'] as string
const web3Object: Web3Type = new Web3(rpcURL)

export interface DataToSign {
  address: string | null
  whaleAdress?: string | null
}

export const getSignature = (
  dataToSign: DataToSign,
  address: string
): string => {
  const signature: Sign = web3Object.eth.accounts.sign(
    JSON.stringify(dataToSign),
    address
  )
  return signature.signature
}

export default web3Object
