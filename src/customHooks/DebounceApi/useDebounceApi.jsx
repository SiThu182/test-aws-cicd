import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
const useDebouncedApiCall = (apiFunction, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(null);

  const [loading, setLoading] = useState(false);
  const timeoutId = useRef(null);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedApiFunction = useCallback((path) => apiFunction(path), []);

  useEffect(() => {
    if (debouncedValue !== null) {
      const fetchData = async () => {
        try {
          setLoading(true);

          dispatch(memoizedApiFunction(debouncedValue));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }

      if (debouncedValue !== null) {
        timeoutId.current = setTimeout(fetchData, delay);
      }
    }

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [dispatch, debouncedValue, delay, memoizedApiFunction]);

  return { debouncedValue, loading, setDebouncedValue };
};

export default useDebouncedApiCall;
