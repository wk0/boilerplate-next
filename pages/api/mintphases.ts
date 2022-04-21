// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mintPhases from '../../data/phases';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.remix) {
    res.status(200).json(mintPhases.map((x) => {
      return [
        Math.floor(x.startTimestamp / 1000),
        x.pricePerToken.toString(),
        !x.merkleRoot ? "0x0000000000000000000000000000000000000000000000000000000000000000" : x.merkleRoot,
      ]
    }));
  } else {
    res.status(200).json(mintPhases.map((x) => {
      return {
        startTimestamp: new Date(x.startTimestamp).toISOString(),
        pricePerToken: x.pricePerToken.toString(),
        merkleRoot: x.merkleRoot,
        allowedMints: x.allowedMints,
      }
    }));
  }
}
