import prisma from '../../../libs/prismadb';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const result = await prisma.Session.create({
      data: { ...req.body }
    });

    console.group();
    return res.status(200).send(result);
  } catch (error) {
    console.log('Error saving session: ', error);
    return res.status(400).end();
  }
} 