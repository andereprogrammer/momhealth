import {useState, useEffect} from 'react';

const useFetchJson = <T>(
  url: string,
): {data: T | null; loading: boolean; error: string | null} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
          },
        });
        // console.error(`TEST RESPONSE: ${JSON.stringify(response)}`);
        // console.error(`response: ${JSON.stringify(response)}`);
        // console.error(`text: ${await response.text()}`);
        const jsonResponse: {data: T[]} | any = await response.json();
        const filteredData = jsonResponse.hasOwnProperty('data')
          ? jsonResponse.data
          : jsonResponse;
        setData(filteredData);
      } catch (e) {
        setError(`Failed to fetch data: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {data, loading, error};
};

export default useFetchJson;
