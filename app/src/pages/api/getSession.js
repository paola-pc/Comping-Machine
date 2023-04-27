
import prisma from '../../../libs/prismadb';

export default async function handler(req, res) {
  console.log('hello form getSession !!!')
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const session = await prisma.Session.findUnique({ where: { id: req.query.id } })
    return res.status(200).send(session)
  } catch (error) {
    console.log('error in api/getSession: ', error.message);
    return res.status(400).end()
  }
} 