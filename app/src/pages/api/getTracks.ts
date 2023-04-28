
import prisma from '../../../libs/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handleCurrentUser(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const tracks = await prisma.Session.findMany({where: { userId: req.query.id}})

    // console.log('typeof response ', Object.prototype.toString.call(tracks));
    res.send(tracks)
  } catch (error) {
    console.log('error in api/getTracks: ', error.message);
    return res.status(400).end()
  }
}