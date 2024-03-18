import { useEffect } from "react";

export const useLocalStorage = (value: unknown[], itemName = "data") => {
  const saveDataToLocalStorage = () => {
    const stringifyTasks = JSON.stringify(value);
    localStorage.setItem(itemName, stringifyTasks);
  };
  useEffect(() => {
    saveDataToLocalStorage();
  }, [value]);
};
