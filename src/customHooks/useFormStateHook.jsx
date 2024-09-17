import { useState } from 'react';

// Initialize formState with empty strings for each field
const useFormStateHook = (initialFields) => {
  const initialData = initialFields.reduce((acc, field) => {
    acc[field.name] = ''; // Initialize each field with an empty string
    return acc;
  }, {});

  const [formState, setFormState] = useState({
    data: initialData,
    errors: [],
    isShowModel: false,
    isShowSnackBar: false,
  });

  // Handle form field changes
  const handleChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [fieldName]: value,
      },
      errors: prevState.errors.filter((error) => error !== fieldName), // Remove field from errors if it's no longer empty
    }));
  };

  // Handle form submission and validate all fields
  const handleSubmit = () => {
    const newErrors = [];

    // Check if any field is empty
    Object.entries(formState.data).forEach(([key, value]) => {
      if (!value) {
        newErrors.push(key);
      }
    });

    if (newErrors.length > 0) {
      setFormState((prevState) => ({
        ...prevState,
        errors: newErrors,
      }));
      return false; // Form has errors, don't proceed
    }

    return true; // Form is valid, proceed with submission
  };

  // Set modal visibility
  const setShowModal = (value) => {
    setFormState((prevState) => ({
      ...prevState,
      isShowModel: value,
    }));
  };

  // Set snackbar visibility
  const setShowSnackBar = (value) => {
    setFormState((prevState) => ({
      ...prevState,
      isShowSnackBar: value,
    }));
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    setShowModal,
    setShowSnackBar,
  };
};

export default useFormStateHook;
