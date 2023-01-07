import { useState, useEffect } from "react";
import axios from "axios";

interface useFetchProps {
  url: string;
  formatter?: Function;
  defaultValue?: any;
}

const useFetch = ({
  url,
  formatter = (val: any) => val,
  defaultValue = [],
}: useFetchProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaultValue);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setData((prev: any) => formatter(data, prev));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, refetch: getData };
};

export default useFetch;
