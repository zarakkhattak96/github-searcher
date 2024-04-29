import { createContext } from 'react';

//NOTE: theme context only to handle the stateVariables and setter funcs!
type Theme = {
  changeTheme: (value: boolean) => void;
};

export const ThemeContext = createContext<Theme>({
  changeTheme: () => {},
});
