import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Session from "../interfaces/Session";

interface useDeleteProps {
  url: string;
  afterSuccess?: Function;
  formatter?: Function;
  errorHandler?: Function;
}

const useDelete = ({
  url,
  afterSuccess,
  formatter = (data: any) => data,
  errorHandler,
}: useDeleteProps) => {
  const { data: session } = useSession();
  const accesstoken = (session as Session | null)?.user?.accessToken;
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_SERVER_URL + url,
        {
          headers: {
            accesstoken,
          },
        }
      );
      const result = formatter(response);
      afterSuccess && afterSuccess(result);
    } catch (err: any) {
      console.log(err);
      errorHandler && errorHandler(err.response);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
};

export default useDelete;
