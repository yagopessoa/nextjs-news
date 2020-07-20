// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { name },
  } = req;

  res.status(200).json({ message: `Hello ${name}` });
};
