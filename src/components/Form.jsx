import React from 'react';
import useFormStateHook from '../customHooks/useFormStateHook'; // Updated import

const formFields = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'age', label: 'Age', type: 'number' },
  {
    name: 'gender',
    label: 'Gender',
    type: 'radio',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
  },
  { name: 'terms', label: 'Accept Terms', type: 'checkbox' },
];

const Form = () => {
  // Pass initial form fields to the custom hook
  const { formState, handleChange, handleSubmit, setShowModal, setShowSnackBar } = useFormStateHook(formFields);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    handleChange(name, inputValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (handleSubmit()) {
      setShowModal(true); // Show modal if form is valid
      setShowSnackBar(true); // Show snackbar if form is valid
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {formFields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>

          {/* Handling radio input type separately */}
          {field.type === 'radio' && field.options ? (
            field.options.map((option) => (
              <div key={option.value}>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formState.data[field.name] === option.value}
                    onChange={handleInputChange}
                  />
                  {option.label}
                </label>
              </div>
            ))
          ) : field.type === 'checkbox' ? (
            <input
              id={field.name}
              name={field.name}
              type="checkbox"
              checked={!!formState.data[field.name]} // Boolean check for checkbox
              onChange={handleInputChange}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formState.data[field.name] || ''}
              onChange={handleInputChange}
            />
          )}

          {formState.errors.includes(field.name) && (
            <span style={{ color: 'red' }}>{field.label} is required</span>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>

      {/* Example Modal/Snackbar visibility management */}
      {formState.isShowModel && <div>Form Submitted Successfully!</div>}
      {formState.isShowSnackBar && <div>SnackBar: Action Completed!</div>}
    </form>
  );
};

export default Form;
