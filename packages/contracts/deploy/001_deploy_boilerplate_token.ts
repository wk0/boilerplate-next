import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {parseEther} from 'ethers/lib/utils';

import {
  ERC20_TOKEN_NAME,
  ERC20_TOKEN_SYMBOL,
  ERC20_TOKEN_SUPPLY,
  ERC20_TOKEN_TAG,
  ERC20_TOKEN_DEPLOY_ID,
} from '../utils/constants';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, beneficiary} = await getNamedAccounts();

  // BoilerplateToken.sol
  // -------------------------
  //  * string memory name,
  //  * string memory symbol,
  //  * uint256 initialSupply,
  //  * address beneficiary
  // -------------------------

  await deploy(ERC20_TOKEN_TAG, {
    contract: ERC20_TOKEN_TAG,
    from: deployer,
    args: [ERC20_TOKEN_NAME, ERC20_TOKEN_SYMBOL, parseEther(ERC20_TOKEN_SUPPLY), beneficiary],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
};
export default func;
func.id = ERC20_TOKEN_DEPLOY_ID; // can alter to deploy again
func.tags = [ERC20_TOKEN_TAG];
