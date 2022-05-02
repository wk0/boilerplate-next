// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
const { keccak256, defaultAbiCoder } = ethers.utils
import mintPhases from '../../data/phases'

function getUserMintDetails(address: string) {
  console.log('getUserMintDetails1', address)
  // find the phase in mintPhases that contains the address
  const usersPhase = mintPhases.find((phase) => {
    return phase.allowedMints[address] != null
  })
  console.log('getUserMintDetails2', usersPhase)
  // returns phase name, max mint, and mint price
  return {
    userPhase: usersPhase?.name || 'No Phase',
    allowedMints: usersPhase?.allowedMints[address] || 0,
    pricePerToken: usersPhase?.pricePerToken || 0,
  }
}

function getActiveMintPhase() {
  const now = Date.now()
  const count = mintPhases.length
  if (count == 0 || now < mintPhases[0].startTimestamp) return null
  for (let i = count - 1; i >= 0; i--) {
    // Expect timestamps to be in ascending order for mint phases
    if (now >= mintPhases[i].startTimestamp) {
      return mintPhases[i].merkleRoot == null ? null : mintPhases[i]
    }
  }
  return null
}

function getMintDetails(address: string) {
  const activeMintPhase = getActiveMintPhase()
  const userMintDetails = getUserMintDetails(address)

  // If no active mint phase, should still return user's mint details
  if (!activeMintPhase) {
    return {
      userPhase: userMintDetails.userPhase,
      allowedMints: userMintDetails.allowedMints,
      pricePerToken: userMintDetails.pricePerToken,
      proofs: null,
      msg: 'No active mint phase.',
    }
  }

  if (userMintDetails?.allowedMints == 0) {
    return {
      userPhase: userMintDetails.userPhase,
      allowedMints: userMintDetails.allowedMints,
      pricePerToken: userMintDetails.pricePerToken,
      proofs: null,
      msg: 'User not in any mint phase.',
    }
  }

  const leaf = keccak256(
    defaultAbiCoder.encode(
      ['address', 'uint256'],
      [address, userMintDetails.allowedMints]
    )
  )
  const proofs = activeMintPhase?.merkleTree?.getHexProof(leaf)
  // Only return proofs if user is in a phase and is in the active phase
  return {
    userPhase: userMintDetails.userPhase,
    allowedMints: userMintDetails.allowedMints,
    pricePerToken: activeMintPhase.pricePerToken.toString(),
    proofs,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mintDetails = getMintDetails(req.query?.address.toString())
    res.status(200).json({ mintDetails })
  } catch (err) {
    res
      .status(500)
      .json({ error: 'There was an error from the server, please try again' })
  }
}
