import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://chohan-apis.onrender.com', // Your API base URL
});

// Create a global error handler variable
let globalErrorHandler = null;

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = 'YOUR_API_TOKEN';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Pass the error to the global error handler if it exists
    if (globalErrorHandler) {
      globalErrorHandler(error);
    }
    return Promise.reject(error);
  }
);

// Custom hook to fetch data (GET requests)
const useFetchData = (endpoint, isRequest = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(isRequest);
  const [error, setError] = useState(null);

  // Memoize the fetchData function
  const fetchData = useCallback(async () => {
    if (!isRequest) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err);

      // Pass the error to the global error handler
      if (globalErrorHandler) {
        globalErrorHandler(err);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, isRequest]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the return value
  return useMemo(() => ({ data, loading, error, refetch }), [data, loading, error, refetch]);
};

// Custom hook to post data (POST requests)
const usePostData = (endpoint, payload) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize the postData function
  const postData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post(endpoint, payload);
      setData(response.data);
    } catch (err) {
      setError(err);

      // Pass the error to the global error handler
      if (globalErrorHandler) {
        globalErrorHandler(err);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, payload]);

  // Memoize the return value
  return useMemo(() => ({ data, loading, error, postData }), [data, loading, error, postData]);
};

// Function to set the global error handler
export const setGlobalErrorHandler = (handler) => {
  globalErrorHandler = handler;
};

export { useFetchData, usePostData };