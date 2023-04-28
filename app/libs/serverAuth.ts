import { getSession } from "next-auth/react";
import prisma from './prismadb';
import type { NextApiRequest } from 'next'

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error('Not signed in')
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!currentUser) {
    return false;
  }

  return currentUser
}

export default serverAuth;