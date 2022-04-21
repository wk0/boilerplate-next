import { ethers } from 'ethers';
const { parseUnits, keccak256, defaultAbiCoder } = ethers.utils;
import { MerkleTree } from 'merkletreejs';
import phase1AccessList from './mintphase-1';
import phase2AccessList from './mintphase-2';
import phase3AccessList from './mintphase-3';


function generateMerkleTree(accessList) {
  const leaves = accessList.map((x) =>
    keccak256(
      defaultAbiCoder.encode(
        ['address', 'uint256'],
        [x[0], x[1]],
      ),
    ),
  );
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  return tree;
}

const phase1MerkleTree = generateMerkleTree(phase1AccessList);
const phase2MerkleTree = generateMerkleTree(phase2AccessList);
const phase3MerkleTree = generateMerkleTree(phase3AccessList);


const mintPhases = [
  {
    startTimestamp: new Date('2022-04-22T00:00:00').getTime(),
    pricePerToken: parseUnits('0', 'ether'),
    merkleTree: phase1MerkleTree,
    merkleRoot: phase1MerkleTree.getHexRoot(),
    allowedMints: Object.fromEntries(phase1AccessList),
  },

  {
    startTimestamp: new Date('2022-04-23T00:00:00').getTime(),
    pricePerToken: parseUnits('0.001', 'ether'),
    merkleTree: phase2MerkleTree,
    merkleRoot: phase1MerkleTree.getHexRoot(),
    allowedMints: Object.fromEntries(phase2AccessList),
  },

  {
    startTimestamp: new Date('2022-04-24T00:00:00').getTime(),
    pricePerToken: parseUnits('0.002', 'ether'),
    merkleTree: phase3MerkleTree,
    merkleRoot: phase1MerkleTree.getHexRoot(),
    allowedMints: Object.fromEntries(phase3AccessList),
  },

  {
    startTimestamp: new Date('2022-04-30T00:00:00').getTime(),
    pricePerToken: 0,
    merkleTree: null,
    merkleRoot: null,
    allowedMints: {},
  },
];

export default mintPhases;