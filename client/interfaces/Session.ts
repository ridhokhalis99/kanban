interface Session {
  user: {
    accessToken: string;
    name: string;
    email: string;
    image?: string;
  };
}

export default Session;
