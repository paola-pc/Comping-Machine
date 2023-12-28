import prisma from '../../../libs/prismadb';


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(410).end();
  }

  try {
    const { username, email } = req.body;
    const oldUser = await prisma.User.findUnique({
      where: { email: email }
    })
    if (!oldUser) {
      const result = await prisma.User.create({
        data: { username, email }
      });
      return res.status(200).send(result);
    }
    return res.status(200).send(oldUser);
  } catch (error) {
    console.log('Error in api/log.js: ', error);
    return res.status(400).end();
  }
} 