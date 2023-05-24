
import prisma from '../../../libs/prismadb';

export default async function handleCurrentUser(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  
  try {
    const tracks = await prisma.Session.findMany({where: { userId: req.query.id}})
    res.send(tracks)
  } catch (error) {
    console.log('error in api/getTracks: ', error.message);
    return res.status(400).end()
  }
} 