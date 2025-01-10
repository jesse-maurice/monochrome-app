import NextAuth, { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };