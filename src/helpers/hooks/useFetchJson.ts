import {useState, useEffect} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchJson = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axios.get(url, {signal});
        setData(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError((err as AxiosError).message || 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData().then();

    return () => {
      abortController.abort(); // Cancel ongoing request when component unmounts or when URL changes
    };
  }, [url]);

  return {data, loading, error};
};

export default useFetchJson;
