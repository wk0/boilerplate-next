import { ethers } from 'ethers'
const { parseUnits, keccak256, defaultAbiCoder } = ethers.utils
import { MerkleTree } from 'merkletreejs'
import phase1AccessList from './mintphase-1'
import phase2AccessList from './mintphase-2'
import phase3AccessList from './mintphase-3'

function generateMerkleTree(accessList) {
  const leaves = accessList.map((x) =>
    keccak256(defaultAbiCoder.encode(['address', 'uint256'], [x[0], x[1]]))
  )
  const tree = new MerkleTree(leaves, keccak256, { sort: true })
  return tree
}

const phase1MerkleTree = generateMerkleTree(phase1AccessList)
const phase2MerkleTree = generateMerkleTree(phase2AccessList)
const phase3MerkleTree = generateMerkleTree(phase3AccessList)

const mintPhases = [
  {
    startTimestamp: new Date('2022-01-01T00:00:00').getTime(),
    pricePerToken: 0,
    name: 'PREMINT',
    merkleRoot: null,
    merkleTree: null,
    allowedMints: 0,
  },
  {
    startTimestamp: new Date('2022-05-01T22:40:00').getTime(),
    pricePerToken: parseUnits('0', 'ether'),
    merkleTree: phase1MerkleTree,
    merkleRoot: phase1MerkleTree.getHexRoot(),
    name: 'TEAMS',
    allowedMints: Object.fromEntries(
      phase1AccessList.map((x) => [x[0].toLowerCase(), x[1]])
    ),
  },
  {
    startTimestamp: new Date('2022-05-01T22:48:00').getTime(),
    pricePerToken: parseUnits('0.001', 'ether'),
    merkleTree: phase2MerkleTree,
    merkleRoot: phase2MerkleTree.getHexRoot(),
    name: 'ALLOWLIST',
    allowedMints: Object.fromEntries(
      phase2AccessList.map((x) => [x[0].toLowerCase(), x[1]])
    ),
  },

  {
    startTimestamp: new Date('2022-05-01T22:56:00').getTime(),
    pricePerToken: parseUnits('0.002', 'ether'),
    merkleTree: phase3MerkleTree,
    merkleRoot: phase3MerkleTree.getHexRoot(),
    name: 'WAITLIST',
    allowedMints: Object.fromEntries(
      phase3AccessList.map((x) => [x[0].toLowerCase(), x[1]])
    ),
  },

  {
    startTimestamp: new Date('2022-05-01T23:04:00').getTime(),
    pricePerToken: parseUnits('0.003', 'ether'),
    merkleTree: null,
    merkleRoot: null,
    allowedMints: {},
    name: 'PUBLIC',
  },
]

export default mintPhases
