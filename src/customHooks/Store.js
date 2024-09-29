import {create} from 'zustand';

// Create Zustand store
const useStore = create((set) => ({
  // Array state
  myArray: [],

  // Object state
  myObject: {},

  // Array operations
  addToArrayExist: (newData) => set((state) => ({
    myArray: [...state.myArray, newData],
  })),

  addToArrayNew: (newData) => set({
    myArray: [newData],
  }),

  removeFromArray: (valueToRemove) => set((state) => ({
    myArray: state.myArray.filter(item => item !== valueToRemove),
  })),

  // Object operations
  addToObjectExist: (key, value) => set((state) => ({
    myObject: { ...state.myObject, [key]: value },
  })),

  addToObjectNew: (key, value) => set({
    myObject: { [key]: value },
  }),

  removeFromObject: (keyToRemove) => set((state) => {
    const { [keyToRemove]: _, ...rest } = state.myObject;
    return { myObject: rest };
  }),
}));

export default useStore;
