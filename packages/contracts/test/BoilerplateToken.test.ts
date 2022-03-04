import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import {setupUser, setupUsers} from './utils';
import {parseEther} from 'ethers/lib/utils';

import {ERC20_TOKEN_NAME, ERC20_TOKEN_SYMBOL, ERC20_TOKEN_SUPPLY, ERC20_TOKEN_TAG} from '../utils/constants';
import {BoilerplateToken} from '../typechain/BoilerplateToken';

const setup = deployments.createFixture(async () => {
  await deployments.fixture(ERC20_TOKEN_TAG);
  const {beneficiary} = await getNamedAccounts();
  const contracts = {
    BoilerplateToken: <BoilerplateToken>await ethers.getContract(ERC20_TOKEN_TAG),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
    beneficiary: await setupUser(beneficiary, contracts),
  };
});

describe('BoilerplateToken Spec', function () {
  // 1. test name
  it('has correct name', async function () {
    const {BoilerplateToken} = await setup();
    expect(await BoilerplateToken.name()).to.equal(ERC20_TOKEN_NAME);
  });

  // 2. test symbol
  it('has correct symbol', async function () {
    const {BoilerplateToken} = await setup();
    expect(await BoilerplateToken.symbol()).to.equal(ERC20_TOKEN_SYMBOL);
  });

  // 3. test supply
  it('total supply is equal to initial supply', async function () {
    const {BoilerplateToken} = await setup();
    expect(await BoilerplateToken.totalSupply()).to.equal(parseEther(ERC20_TOKEN_SUPPLY));
  });

  // 4. test decimals
  it('decimal is assumed value of 18', async function () {
    const {BoilerplateToken} = await setup();
    expect(await BoilerplateToken.decimals()).to.equal(18);
  });
});

describe('BoilerplateToken Transfers', function () {
  it('transfer fails', async function () {
    const {users} = await setup();
    await expect(users[0].BoilerplateToken.transfer(users[1].address, 1)).to.be.revertedWith(
      'ERC20: transfer amount exceeds balance'
    );
  });

  it('transfer succeed', async function () {
    const {users, beneficiary, BoilerplateToken} = await setup();
    await beneficiary.BoilerplateToken.transfer(users[1].address, 1);

    await expect(beneficiary.BoilerplateToken.transfer(users[1].address, 1))
      .to.emit(BoilerplateToken, 'Transfer')
      .withArgs(beneficiary.address, users[1].address, 1);
  });
});
