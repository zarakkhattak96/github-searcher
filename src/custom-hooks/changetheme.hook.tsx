// import { useState, useEffect } from 'react';

// type Theme = 'dark' | 'light';
// type themeReturns = [string, (isChecked: boolean) => void];

// //Hooks let you use state and other React features without writing a class
// // Building your own Hooks lets you extract component logic into reusable functions.

// export const useTheme = (initialTheme: Theme): themeReturns => {
//   // customHook: JS func,  starts with the keyword "use"

//   const [theme, setTheme] = useState<Theme>(initialTheme);

//   const handleChange = (isChecked: boolean) => {
//     setTheme(isChecked ? 'dark' : 'light');
//   };

//   useEffect(() => {
//     if (theme === 'dark') {
//       document.body.style.backgroundColor = '#1e2226';
//       document.body.style.color = '#f2f2f2';
//     } else {
//       document.body.style.backgroundColor = '#f2f2f2';
//       document.body.style.color = '#1e2226';
//     }
//     console.log(theme, 'theme');
//   }, [theme]);

//   return [theme, handleChange];
// };

import { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext({ theme: 'light' });

const ThemeProvider = ({ props }) => {
  const initialTheme = () => localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme(() => (theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.getElementsByClassName('darkMode')[0].classList.add('darkMode');
    } else {
      document
        .getElementsByClassName('darkMode')[0]
        .classList.remove('darkMode');
    }
    console.log(theme, 'theme');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };
