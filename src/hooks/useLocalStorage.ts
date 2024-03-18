import { useEffect } from "react";

export const useLocalStorage = (value: any[], itemName = "data") => {
  useEffect(() => {
    saveDataToLocalStorage();
  }, [value]);

  const saveDataToLocalStorage = () => {
    const stringifyTasks = JSON.stringify(value);
    localStorage.setItem(itemName, stringifyTasks);
  };
};
