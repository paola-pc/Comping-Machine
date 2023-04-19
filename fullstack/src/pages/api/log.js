import prisma from '../../libs/prismadb';

export default async function handleLog(req, res) {
  //limit this function to post requests
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { username, email } = req.body;
    await prisma.user.create({
      data: {
        username,
        email
      }
    })
    return res.send(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
} 