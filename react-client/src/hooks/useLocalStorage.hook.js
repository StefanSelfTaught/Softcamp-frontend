import { useState, useEffect } from 'react';

/* eslint no-console: 0 */

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(localStorage.getItem(key)) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
      console.log("Can't access localStorage!");
    }
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
