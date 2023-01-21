import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Session from "../interfaces/Session";

interface useDeleteProps {
  url: string;
  afterSuccess?: Function;
}

const useDelete = ({ url, afterSuccess }: useDeleteProps) => {
  const { data: session } = useSession();
  const accesstoken = (session as Session | null)?.user?.accessToken;
  const [loading, setLoading] = useState(false);

  const remove = async (value?: any) => {
    try {
      setLoading(true);
      await axios.delete(url, {
        headers: {
          accesstoken,
        },
      });
      afterSuccess && afterSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
};

export default useDelete;
