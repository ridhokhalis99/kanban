import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
  }),
  CredentialsProvider({
    name: "Credentials",
    id: "credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: any) {
      const { data: result } = await axios.post(
        `${process.env.SERVER_URL}/user/login`,
        credentials
      );
      const isUserNotFound = result.error === "User not found";
      if (isUserNotFound) return;
      return result;
    },
  }),
];

const callbacks = {
  signIn: async function signIn({ user, account }: any) {
    if (account.provider === "google") {
      const googleUser = {
        name: user.name,
        email: user.email,
      };
      while (true) {
        const { data: result } = await axios.post(
          `${process.env.SERVER_URL}/user/social-login`,
          googleUser
        );
        const isUserNotFound = result.error === "User not found";
        if (isUserNotFound) {
          await axios.post(
            `${process.env.SERVER_URL}/user/social-register`,
            googleUser
          );
          continue;
        }
        user.accessToken = result.accessToken;
        break;
      }
      return true;
    }
    if (account.provider === "credentials") {
      return true;
    }
    return "/login";
  },
  jwt: async function jwt({ token, user }: any) {
    if (user) {
      token.user = user;
    }
    return token;
  },
  session: async function session({ session, token }: any) {
    session.user = token.user;
    return session;
  },
};

const pages = {
  signIn: "/login",
};

const options = {
  providers,
  callbacks,
  pages,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
