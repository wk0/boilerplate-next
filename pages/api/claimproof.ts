// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
const { keccak256, defaultAbiCoder } = ethers.utils;
import mintPhases from '../../data/phases';


function getActiveMintPhase() {
  const now = Date.now();
  const count = mintPhases.length;
  if (count == 0 || now < mintPhases[0].startTimestamp) return null;
  for (let i = count-1; i >= 0; i--) {
      // Expect timestamps to be in ascending order for mint phases
      if (now >= mintPhases[i].startTimestamp) {
          return (mintPhases[i].merkleRoot == null) ? null : mintPhases[i];
      }
  }
  return null;
}

function getAllowedMints(address: any, activeMintPhase: any) {
  return activeMintPhase?.allowedMints[address];
}

function getProofs(address: any) {
  const activeMintPhase = getActiveMintPhase();
  if (!activeMintPhase) 
    return { allowedMints: 0, pricePerToken: 0, proofs: null, msg: 'No active mint phase.' };
  const allowedMints = getAllowedMints(address, activeMintPhase)
  const leaf = keccak256(
    defaultAbiCoder.encode(
      ['address', 'uint256'],
      [address, allowedMints],
    ),
  );
  const proofs = activeMintPhase?.merkleTree?.getHexProof(leaf);
  return {
    allowedMints, 
    pricePerToken: activeMintPhase.pricePerToken.toString(),
    proofs
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const proof = getProofs(req.query?.address);
  res.status(200).json(proof);
}
