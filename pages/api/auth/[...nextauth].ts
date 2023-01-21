import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
  }),
];

const callbacks = {
  signIn: async function signIn({ user, account }: any) {
    if (account.provider === "google") {
      const googleUser = {
        id: user.id,
        name: user.name,
      };
      user.accessToken = "1234567890";
      return true;
    }
    return false;
  },
};

const pages = {
  signIn: "/login",
  newUser: "/register",
};

const secret = process.env.NEXTAUTH_SECRET as string;

const options = {
  providers,
  callbacks,
  pages,
  secret,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
