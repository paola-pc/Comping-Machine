import prisma from '../../../libs/prismadb';

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const result = await prisma.Session.delete({
      where: {
        id : req.query.id,
      },
    })
    return res.status(200).send(result)
  } catch (error) {
    console.log('Error deleting session: ', error);
    return res.status(400).end()
  }
}