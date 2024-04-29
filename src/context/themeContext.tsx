import { createContext } from 'react';

type Theme = {
  changeTheme: (value: boolean) => void;
};

export const ThemeContext = createContext<Theme>({
  changeTheme: () => {},
});
