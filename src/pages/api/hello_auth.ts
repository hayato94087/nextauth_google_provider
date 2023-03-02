import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getServerSession(req, res, authOptions);

  console.log(session);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

  return res.json({
    message: 'Success',
  });
};

export default handler;
