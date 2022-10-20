import { useState } from 'react';

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sendHttp = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, sendHttp };
};

export default useFetch;
