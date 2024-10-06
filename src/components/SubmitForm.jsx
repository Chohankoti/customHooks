import React, { useRef, useEffect, useState } from 'react';

const Form = React.forwardRef(({ fields, onSubmit }, ref) => {
  const inputRefs = useRef([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const validateField = (field, value) => {
    if (field.required && !value) return false;
    if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) return false;
    return true;
  };

  const handleChange = (event, field) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event, field, index) => {
    const { name, value } = event.target;
    if (validateField(field, value)) {
      if (field.saveOnEnter) {
        onSubmit(formValues);
      } else if (index < fields.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, field, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const { name, value } = event.target;
      if (validateField(field, value)) {
        if (field.saveOnEnter) {
          onSubmit(formValues);
        } else if (index < fields.length - 1) {
          inputRefs.current[index + 1].focus();
        } else {
          onSubmit(formValues);
        }
      }
    }
  };

  return (
    <form ref={ref}>
      {fields.map((field, index) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            ref={el => inputRefs.current[index] = el}
            type={field.type}
            name={field.name}
            id={field.name}
            required={field.required}
            onChange={(e) => handleChange(e, field)}
            onBlur={(e) => handleBlur(e, field, index)}
            onKeyDown={(e) => handleKeyDown(e, field, index)}
          />
        </div>
      ))}
    </form>
  );
});

export default function SubmitForm() {
  const formRef = useRef(null);

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      saveOnEnter: false,
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      saveOnEnter: true,
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      saveOnEnter: false,
      required: true
    }
  ];

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form fields={fields} ref={formRef} onSubmit={handleSubmit} />
      <button type="button" onClick={() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>
        Submit
      </button>
    </>
  );
}







// import React, { useRef, useEffect, useState } from 'react';
// import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

// const Form = React.forwardRef(({ fields, onSubmit }, ref) => {
//   const inputRefs = useRef([]);
//   const [formValues, setFormValues] = useState({});

//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const validateField = (field, value) => {
//     if (field.required && !value) return false;
//     if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) return false;
//     return true;
//   };

//   const handleChange = (text, field) => {
//     setFormValues(prev => ({ ...prev, [field.name]: text }));
//   };

//   const handleSubmitEditing = (field, index) => {
//     const value = formValues[field.name] || '';
//     if (validateField(field, value)) {
//       if (field.saveOnEnter) {
//         onSubmit(formValues);
//         // Don't move focus if saveOnEnter is true
//         return;
//       }
      
//       if (index < fields.length - 1) {
//         inputRefs.current[index + 1].focus();
//       } else {
//         onSubmit(formValues);
//       }
//     }
//   };

//   return (
//     <View ref={ref}>
//       {fields.map((field, index) => (
//         <View key={field.name} style={styles.inputContainer}>
//           <Text style={styles.label}>{field.label}</Text>
//           <TextInput
//             ref={el => inputRefs.current[index] = el}
//             style={styles.input}
//             onChangeText={(text) => handleChange(text, field)}
//             onSubmitEditing={() => handleSubmitEditing(field, index)}
//             secureTextEntry={field.type === 'password'}
//             inputMode={field.type === 'email' ? 'email' : 'text'}
//             enterKeyHint={field.saveOnEnter ? 'send' : (index === fields.length - 1 ? 'done' : 'next')}
//             blurOnSubmit={field.saveOnEnter}
//             value={formValues[field.name] || ''}
//           />
//         </View>
//       ))}
//     </View>
//   );
// });

// export default function SubmitForm() {
//   const formRef = useRef(null);
//   const [submittedData, setSubmittedData] = useState(null);

//   const fields = [
//     {
//       name: 'name',
//       label: 'Name',
//       type: 'text',
//       saveOnEnter: false,
//       required: true
//     },
//     {
//       name: 'email',
//       label: 'Email',
//       type: 'email',
//       saveOnEnter: true,
//       required: true
//     },
//     {
//       name: 'password',
//       label: 'Password',
//       type: 'password',
//       saveOnEnter: false,
//       required: true
//     }
//   ];

//   const handleSubmit = (data) => {
//     console.log('Form submitted with data:', data);
//     setSubmittedData(data);
//   };

//   return (
//     <View style={styles.container}>
//       <Form fields={fields} ref={formRef} onSubmit={handleSubmit} />
//       <Pressable 
//         style={styles.button} 
//         onPress={() => formRef.current && handleSubmit(formRef.current.formValues)}
//       >
//         <Text style={styles.buttonText}>Submit</Text>
//       </Pressable>
//       {submittedData && (
//         <View style={styles.submittedData}>
//           <Text>Submitted Data:</Text>
//           {Object.entries(submittedData).map(([key, value]) => (
//             <Text key={key}>{key}: {value}</Text>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   submittedData: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
// });