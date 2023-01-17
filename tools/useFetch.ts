import { useState, useEffect } from "react";
import axios from "axios";

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

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setData((prev: any) => formatter(data, prev));
      afterSuccess && afterSuccess(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!woFetchFirst) {
      getData();
    }
  }, []);

  return { data, loading, refetch: getData };
};

export default useFetch;
