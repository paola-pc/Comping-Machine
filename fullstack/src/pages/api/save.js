import prisma from '../../../libs/prismadb';

export default async function handler(req, res) {
  //limit this function to post requests
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, creationDate, soundbank_name, pad_sound, pad_track } = req.body;
    delete req.body.soundbank_name;
    delete req.body.pad_sound;
    console.log('req body', req.body)
    const result = await prisma.Session.create({
      data: {
        name,
        creationDate,
        pad_sound: pad_sound.url,
        pad_track,
        drumkit: soundbank_name,
        ...req.body
      }
    });
    return res.status(200).send(result);
  } catch (error) {
    console.log('things failed in api/save.js: ', error);
    return res.status(400).end();
  }
} 