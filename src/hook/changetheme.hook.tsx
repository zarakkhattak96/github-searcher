import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
type themeReturns = [string, (isChecked: boolean) => void];

//Hooks let you use state and other React features without writing a class
// Building your own Hooks lets you extract component logic into reusable functions.

export const useTheme = (initialTheme: Theme): themeReturns => {
  // customHook: JS func,  starts with the keyword "use"

  const [theme, setTheme] = useState<Theme>(initialTheme);

  const handleChange = (isChecked: boolean) => {
    setTheme(isChecked ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, handleChange];
};
