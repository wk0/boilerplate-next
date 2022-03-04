import hre from 'hardhat';
import {deployments, getNamedAccounts, ethers} from 'hardhat';
import '@nomiclabs/hardhat-etherscan';
import {parseEther} from 'ethers/lib/utils';

import {ERC20_TOKEN_NAME, ERC20_TOKEN_SYMBOL, ERC20_TOKEN_SUPPLY, ERC20_TOKEN_TAG} from '../utils/constants';

async function main() {
  await deployments.fixture(ERC20_TOKEN_TAG);
  const BoilerplateToken = await ethers.getContract(ERC20_TOKEN_TAG);

  const {beneficiary} = await getNamedAccounts();

  const args = [ERC20_TOKEN_NAME, ERC20_TOKEN_SYMBOL, parseEther(ERC20_TOKEN_SUPPLY), beneficiary];

  try {
    console.log('Verifying BoilerplateToken on Etherscan');
    await hre.run('verify:verify', {
      address: BoilerplateToken.address,
      constructorArguments: args,
    });
  } catch (err) {
    console.error('BoilerplateToken Verification Error', err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
