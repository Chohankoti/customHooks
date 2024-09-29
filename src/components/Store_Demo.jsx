import React from 'react'
import useStore from '../customHooks/Store'

export default function Store_Demo() {
    const {
        myArray,
        myObject,
        addToArrayExist,
        addToArrayNew,
        removeFromArray,
        addToObjectExist,
        addToObjectNew,
        removeFromObject,
      } = useStore();
    
      return (
        <div>
          <h1>Array and Object Zustand Store</h1>
          
          {/* Display Array */}
          <h2>Array:</h2>
          <ul>
            {myArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
    
          <button onClick={() => addToArrayExist('Existing Array Data')}>Add to Array (Exist)</button>
          <button onClick={() => addToArrayNew('New Array Data')}>Add to Array (New)</button>
          <button onClick={() => removeFromArray('Existing Array Data')}>Remove from Array</button>
    
          {/* Display Object */}
          <h2>Object:</h2>
          <pre>{JSON.stringify(myObject, null, 2)}</pre>
    
          <button onClick={() => addToObjectExist('name', 'John')}>Add to Object (Exist)</button>
          <button onClick={() => addToObjectNew('age', 30)}>Add to Object (New)</button>
          <button onClick={() => removeFromObject('name')}>Remove from Object</button>
        </div>
      );
}



