import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Session from "../interfaces/Session";

interface useFetchProps {
  url: string;
  formatter?: Function;
  defaultValue?: any;
  afterSuccess?: Function;
  woFetchFirst?: boolean;
}

const useFetch = ({
  url,
  formatter = (val: any) => val,
  defaultValue = [],
  afterSuccess,
  woFetchFirst = false,
}: useFetchProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaultValue);

  const { data: session } = useSession();
  const accesstoken = (session as Session | null)?.user?.accessToken;

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url, {
        headers: {
          accesstoken,
        },
      });
      setData((prev: any) => formatter(data, prev));
      afterSuccess && afterSuccess(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accesstoken) return;
    if (!woFetchFirst) {
      getData();
    }
  }, []);

  return { data, loading, refetch: getData };
};

export default useFetch;
