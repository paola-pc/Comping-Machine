import prisma from '../../../libs/prismadb';


export default async function handler(req, res) {
  //limit this function to post requests
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, creationDate, steps_ref, soundbank_name } = req.body;
    // const trackExists = await prisma.Track.findUnique({
    //   where: { name: name }
    // })
    // if (!trackExists) {
    console.log('req body',req.body)
    const result = await prisma.Track.create({
      data: { name, creationDate, steps_ref, soundbank_name }
    });
    return res.send(200).json(result);
    // }
    // return res.send(200).json(oldUser);
  } catch (error) {
    console.log('things failed in api/save.js: ', error);
    return res.status(400).end();
  }
} 