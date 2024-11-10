import {useState, useEffect, useMemo} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';

type RequestOptions<T> = {
  method: 'GET' | 'POST'; // HTTP method (GET or POST)
  depends?: any[]; // Dependency array for conditional fetch
  cache?: boolean; // Whether to cache the result
  data?: T; // POST request data (if method is POST)
};

type ApiResponse<T> = {
  data: T | null;
  error: AxiosError<T> | null;
  loading: boolean;
};

export function useApi<T>(
  url: string,
  options: RequestOptions<T>,
): ApiResponse<T> {
  const {method, depends, cache, data} = options;
  const [requestData, setRequestData] = useState<T | null>(data);
  const [apiData, setApiData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const response: AxiosResponse<T> =
          method === 'POST'
            ? await axios.post(url, requestData)
            : await axios.get(url);

        if (!isMounted) return;

        setApiData(response.data);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;

        setError(err);
        setLoading(false);
      }
    };

    if (!depends || depends.length === 0 || depends.every(dep => !!dep)) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url, depends, method, requestData]);

  const apiResponse: ApiResponse<T> = useMemo(
    () => ({data: apiData, error, loading}),
    [apiData, error, loading],
  );

  if (cache) {
    return apiResponse;
  } else {
    return {...apiResponse, data: null};
  }
}
