import { useState, useEffect } from "react";

export default function useFetch(url, options) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, { ...options, signal });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Something went wrong!");
        }

        setState({ data: result, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err.message,
        });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, options]);

  return state;
}
