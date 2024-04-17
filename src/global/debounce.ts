// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: any, wait: number) => {
  let timeout: number;

  return function executedDebounce(...args: unknown[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
