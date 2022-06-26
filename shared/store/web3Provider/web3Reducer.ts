import { Web3ProviderState,web3ProviderAction } from './web3Types'

const Web3ProviderInitialState: Web3ProviderState  = {
  provider: null,
  web3Provider: null,
  address: null,
  network: null,
  signer: null,
  connect: null,
  disconnect: null,
};

const web3ProviderReducer = (state = Web3ProviderInitialState, action:web3ProviderAction) => {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return Object.assign({}, state, {
        provider: action.payload.provider,
        web3Provider: action.payload.web3Provider,
        address: action.payload.address,
        network: action.payload.network,
        signer: action.payload.signer
      });
      case 'SET_ADDRESS':
        return {
          ...state,
          address: action.payload.address,
        }
      case 'SET_NETWORK':
        return {
          ...state,
          network: action.payload.network,
        }
      case 'RESET_WEB3_PROVIDER':
        return Web3ProviderInitialState
      default:
        return state
    }
};

export default web3ProviderReducer;
