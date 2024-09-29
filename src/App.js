import React, { useState, useEffect } from 'react';
import Interceptor_Post from './components/Interceptor_Post';
import Interceptor_Get from './components/Interceptor_Get';
import { setGlobalErrorHandler } from './customHooks/useFetchData';

export default function App() {
  const [globalError, setGlobalError] = useState(null);

  // Set the global error handler to capture any error that occurs in the Axios interceptor or the useFetchData hook
  useEffect(() => {
    setGlobalErrorHandler((error) => {
      setGlobalError(error);
    });
  }, []);

  return (
    <>
      {/* Global error display */}
      {globalError && (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
          <strong>Error:</strong> {globalError.message || 'An error occurred!'}
        </div>
      )}

      {/* Main content */}
      <Interceptor_Post />
    </>
  );
}
