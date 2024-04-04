import { useEffect, useState } from 'react';
import { Switch } from 'antd';

// const themeInput = {
//   light: {
//     titleText: 'Light Mode',
//     buttonText: 'Switch To Dark',
//   },
//   dark: {
//     titleText: 'Dark Mode',
//     buttonText: 'Switch To Light',
//   },
// };

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'light') {
      document.body.style.backgroundColor = '#eaeaea';
    } else {
      document.body.style.backgroundColor = '#191919';
    }

    // document.body.style.backgroundColor = 'white';

    console.log(theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <div className='dark-mode'>
        <Switch className='switch-style' onClick={changeTheme} />
      </div>
    </>
  );
};
