import { useCallback, useState } from "react";

export function useLocalStorage<T extends string>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return (item as T) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, value);
      } catch {
        // Ignore localStorage errors
      }
    },
    [key],
  );

  return [storedValue, setValue];
}
