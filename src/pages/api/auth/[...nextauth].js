import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
  ], 
  session: {
    strategy: 'jwt'
  },
  // adapter: PrismaAdapter(prisma),
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  sercret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(AuthOptions)