import 'dotenv/config';

import {assert, expect} from './chai-setup';
import {ethers} from 'hardhat';

const {NOT_AN_ENV_VAR, ETH_NODE_URI_MAINNET, ETH_NODE_URI_KOVAN, MNEMONIC, COINMARKETCAP_API_KEY, ETHERSCAN_API_KEY} =
  process.env;

describe('Tests themselves work', function () {
  it('Must be running or there is a configuration problem', async function () {
    assert(true);
  });
});

describe('Is Env file correctly configured', function () {
  // false test to ensure no false passing
  it('test correctly detects missing', async function () {
    expect(NOT_AN_ENV_VAR).to.be.undefined;
    assert.notExists(process.env.NOT_AN_ENV_VAR);
  });

  describe('mainnet node', async function () {
    it('has ETH_NODE_URI_MAINNET', async function () {
      expect(ETH_NODE_URI_MAINNET, 'did you add ETH_NODE_URI_MAINNET to .env?').to.not.be.undefined;
    });

    it('has usable mainnet provider', async function () {
      expect(ETH_NODE_URI_MAINNET, 'is ETH_NODE_URI_RINKEBY the full alchemy http url?').to.include(
        'https://eth-mainnet.alchemyapi.io/v2/'
      );
      expect(ETH_NODE_URI_MAINNET?.length, 'did you add the API key at the end of the URL?').to.equal(69);
    });
  });

  describe('kovan node', async function () {
    it('has ETH_NODE_URI_KOVAN', async function () {
      expect(ETH_NODE_URI_KOVAN, 'did you add ETH_NODE_URI_KOVAN to .env?').to.not.be.undefined;
    });

    it('has usable kovan provider', async function () {
      expect(ETH_NODE_URI_KOVAN, 'is ETH_NODE_URI_KOVAN the full alchemy http url?').to.include(
        'https://eth-kovan.alchemyapi.io/v2/'
      );
      expect(ETH_NODE_URI_KOVAN?.length, 'did you add the API key at the end of the URL?').to.equal(67);
    });
  });

  describe('mnemonic', async function () {
    it('has MNEMONIC', async function () {
      expect(MNEMONIC).to.not.be.undefined;
    });

    it('mnemonic is 12 words', async function () {
      const mnemonicWordCount = MNEMONIC?.split(' ').length;
      expect(mnemonicWordCount, 'incorrect length for mnemonic, run npx mnemonics').to.equal(12);
    });
  });

  describe('coinmarketcap', async function () {
    it('has COINMARKETCAP_API_KEY', async function () {
      expect(COINMARKETCAP_API_KEY).to.not.be.undefined;
    });

    it('has expected length', async function () {
      expect(COINMARKETCAP_API_KEY?.length).to.equal(36);
    });
  });

  describe('hardhat compat with metamask', async function () {
    it('has chainId 1337', async function () {
      expect(await (await ethers.provider.getNetwork()).chainId).to.equal(1337);
    });
  });

  describe('etherscan', async function () {
    it('has ETHERSCAN_API_KEY', async function () {
      expect(ETHERSCAN_API_KEY).to.not.be.undefined;
    });

    it('has expected length', async function () {
      expect(ETHERSCAN_API_KEY?.length).to.equal(34);
    });
  });
});
