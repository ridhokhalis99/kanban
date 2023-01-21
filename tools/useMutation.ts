import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Session from "../interfaces/Session";

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete";

interface useMutationProps {
  url: string;
  method?: Methods;
  formatter?: Function;
  defaultValue?: any;
  afterSuccess?: Function;
}

const useMutation = ({
  defaultValue = {},
  method = "put",
  url,
  formatter = (data: any) => data,
  afterSuccess,
}: useMutationProps) => {
  const { data: session } = useSession();
  const accesstoken = (session as Session | null)?.user?.accessToken;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(defaultValue);

  const mutation = async (value?: any) => {
    try {
      setLoading(true);
      const response = await axios[method](url, value, {
        headers: {
          accesstoken,
        },
      });
      const result = formatter(response);
      setResult((prev: any) => formatter(response, prev));
      afterSuccess && afterSuccess(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutation, result, loading };
};

export default useMutation;
