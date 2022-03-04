import hre from 'hardhat';
import {deployments, ethers} from 'hardhat';
import '@nomiclabs/hardhat-etherscan';

import {ERC721_NFT_NAME, ERC721_NFT_SYMBOL, ERC721_NFT_TAG} from '../utils/constants';

async function main() {
  await deployments.fixture(ERC721_NFT_TAG);
  const BoilerplateNFT = await ethers.getContract(ERC721_NFT_TAG);

  const args = [ERC721_NFT_NAME, ERC721_NFT_SYMBOL];

  try {
    console.log('Verifying BoilerplateNFT on Etherscan');
    await hre.run('verify:verify', {
      address: BoilerplateNFT.address,
      constructorArguments: args,
    });
  } catch (err) {
    console.error('BoilerplateNFT Verification Error', err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
