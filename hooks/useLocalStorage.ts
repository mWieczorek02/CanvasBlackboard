import { useState } from "react";

export const useLocalStorage = <Type = string>(
  key: string,
  defaultValue?: Type
) => {
  const [firstValue, setFirstValue] = useState<any>(() => {
    try {
      const value = window.localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: Type) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {}
    setFirstValue(newValue);
  };

  return { value: firstValue, setValue };
};
