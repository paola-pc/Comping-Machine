import serverAuth from "../../../libs/serverAuth";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handleCurrentUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    if (currentUser) return res.send(currentUser)
  } catch (error) {
    console.log(error);
    return res.status(400).end()
  }
}

// It checks if theres a user logged in and it returns it!
// Not enough time to implement this fully