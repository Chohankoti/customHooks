import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { usePostData } from '../customHooks/useFetchData';

export default function Interceptor_Post() {
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [submitPayload, setSubmitPayload] = useState(null);

  // Memoize the endpoint
  const endpoint = useMemo(() => '/products', []);

  // Memoize the usePostData hook
  const { data, loading, error, postData } = usePostData(endpoint, submitPayload);

  // Use useEffect to trigger postData when submitPayload changes
  useEffect(() => {
    if (submitPayload) {
      postData();
      console.log('Posting data... loading');
    }
  }, [submitPayload, postData]);

  // Memoize the handleSubmit function
  const handleSubmit = useCallback(() => {
    console.log(formData); // {name: "New Product", price: "100"}
    const payload = {
      name: formData.name || 'New Product',
      price: Number(formData.price) || 100
    };
    console.log(payload); // {name: "New Product", price: 100}
    setSubmitPayload(payload);
  }, [formData]);

  // Memoize the form input handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Memoize the rendered content
  const renderedContent = useMemo(() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (data) return <div>Response: {JSON.stringify(data)}</div>;
    return null;
  }, [loading, error, data]);

  // Memoize the form inputs
  const formInputs = useMemo(() => (
    <div>
      <input 
        type="text" 
        name="name"
        value={formData.name} 
        onChange={handleInputChange} 
        placeholder="Product Name"
      />
      <input 
        type="number" 
        name="price"
        value={formData.price} 
        onChange={handleInputChange} 
        placeholder="Price"
      />
    </div>
  ), [formData, handleInputChange]);

  return (
    <div>
      <h1>Post Data Demo</h1>
      {formInputs}
      {renderedContent}
      <button onClick={handleSubmit}>Submit Data</button>
    </div>
  );
}