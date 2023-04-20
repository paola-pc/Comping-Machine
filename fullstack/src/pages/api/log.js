import prisma from '../../../libs/prismadb';


export default async function handler(req, res) {
  //limit this function to post requests
  if (req.method !== "POST") {
    return res.status(405).end();
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
      return res.send(200).json(result);
    }
    return res.send(200).json(oldUser);
  } catch (error) {
    console.log('things failed in api/log.js: ', error);
    return res.status(400).end();
  }
} 