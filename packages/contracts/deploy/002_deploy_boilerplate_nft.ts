import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import {ERC721_NFT_NAME, ERC721_NFT_SYMBOL, ERC721_NFT_TAG, ERC721_NFT_DEPLOY_ID} from '../utils/constants';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // BoilerplateNFT.sol
  // -------------------------
  //  * string memory name,
  //  * string memory symbol,
  // -------------------------

  await deploy(ERC721_NFT_TAG, {
    contract: ERC721_NFT_TAG,
    from: deployer,
    args: [ERC721_NFT_NAME, ERC721_NFT_SYMBOL],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
};
export default func;
func.id = ERC721_NFT_DEPLOY_ID; // can alter to deploy again
func.tags = [ERC721_NFT_TAG];
