import prisma from './prismadb';
import { AuthOptions } from "../src/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";


const serverAuth = async (req, res) => {
  const session = await getServerSession(req, res, AuthOptions);

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

  return {currentUser}
}

export default serverAuth;