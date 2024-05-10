// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const debounce = (func: any, wait: number) => {
// let timeout: number;
//
// return function executedDebounce(...args: unknown[]) {
// const later = () => {
// clearTimeout(timeout);
// func(...args);
// };
//
// clearTimeout(timeout);
// timeout = setTimeout(later, wait);
// };
// };
//

import { useEffect, useRef } from 'react';

export const useDebounce = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = (...arg: string[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current?.(...arg);
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
