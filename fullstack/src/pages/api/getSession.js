
import prisma from '../../../libs/prismadb';

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const session = await prisma.Session.findUnique({ where: { id: req.query.id } })
    console.log('typeof response ', Object.prototype.toString.call(session));
    res.send(session)
  } catch (error) {
    console.log('error in api/getSession: ', error.message);
    return res.status(400).end()
  }
} 