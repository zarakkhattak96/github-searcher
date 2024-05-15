import { useEffect, useRef } from 'react';

export const useDebounce = <T extends string[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (typeof args[0] === 'string' && args[0].length >= 3)
        callbackRef.current?.(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};
