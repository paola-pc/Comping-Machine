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
    console.group('SAVE RESULT')
    console.log('result.name', result.name);
    console.log('result.id', result.id);
    console.log('result.userId', result.userId);
    console.group();
    return res.status(200).send(result);
  } catch (error) {
    console.log('Error saving session: ', error);
    return res.status(400).end();
  }
} 