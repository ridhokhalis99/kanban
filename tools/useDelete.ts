import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Session from "../interfaces/Session";

interface useDeleteProps {
  url: string;
  afterSuccess?: Function;
  formatter?: Function;
}

const useDelete = ({
  url,
  afterSuccess,
  formatter = (data: any) => data,
}: useDeleteProps) => {
  const { data: session } = useSession();
  const accesstoken = (session as Session | null)?.user?.accessToken;
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        "https://kanban-server.herokuapp.com" + url,
        {
          headers: {
            accesstoken,
          },
        }
      );
      const result = formatter(response);
      afterSuccess && afterSuccess(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
};

export default useDelete;
