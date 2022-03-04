import {Network} from 'hardhat/types';
import {ERC721_BASE_URI_PROD, ERC721_BASE_URI_LOCAL} from './constants';

export function getBaseURI(network: Network) {
  if (network.name === 'localhost' || network.name === 'hardhat') {
    return ERC721_BASE_URI_LOCAL;
  }
  return ERC721_BASE_URI_PROD;
}
