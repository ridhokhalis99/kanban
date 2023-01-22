import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
  }),
  GithubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
  }),
  CredentialsProvider({
    name: "Credentials",
    id: "credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: any) {
      try {
        const { data: result } = await axios.post(
          `https://kanban-server.herokuapp.com/user/login`,
          credentials
        );
        return result;
      } catch (error: any) {
        if (error.response.status === 404) {
          throw new Error("Incorrect email or password");
        }
        return;
      }
    },
  }),
];

const callbacks = {
  signIn: async function signIn({ user, account }: any) {
    const accountGoogle = account.provider === "google";
    const accountGithub = account.provider === "github";
    if (accountGithub || accountGoogle) {
      const userSocial = {
        name: user.name,
        email: user.email,
      };
      while (true) {
        try {
          const { data: result } = await axios.post(
            `https://kanban-server.herokuapp.com/user/social-login`,
            userSocial
          );
          user.accessToken = result.accessToken;
          break;
        } catch (error: any) {
          if (error.response.status === 404) {
            await axios.post(
              `https://kanban-server.herokuapp.com/user/social-register`,
              userSocial
            );
            continue;
          }
          return false;
        }
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
  error: "/login",
};

const options = {
  providers,
  callbacks,
  pages,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
