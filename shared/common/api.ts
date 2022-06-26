import axios from 'axios'
import { getSignature } from './Web3Utils'
import { DataToSign } from './types'

const axiosObject = axios.create({
  baseURL: 'https://nft-bot-354317.de.r.appspot.com',
//   timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

const ApiPost = async (url: string, data: DataToSign, signer: any) => {
  try {
    // const adress = await signer.getAddress();
    const signature: string = await signer.signMessage( JSON.stringify(data))
    const response = await axiosObject({
      method: 'post',
      url: url,
      data: {
        // 這格就是body
        ...data,
        signature
      },
    })
    return response
  } catch (e) {
    console.log('e :', e)
  }
}

const API = {
  GET: null,
  POST: ApiPost,
  PUT: null,
  DELETE: null,
}

export default API
