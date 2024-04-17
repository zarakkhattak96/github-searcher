import { useEffect, useState } from 'react';
import { Space, Switch } from 'antd';

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
      <Space>
        <Switch
          checkedChildren='Dark'
          unCheckedChildren='Light'
          defaultChecked
          size='default'
          onChange={changeTheme}
          style={{
            width: 60,
            height: 27,
            border: '1px solid black',
            textAlign: 'center',
            fontWeight: 'bold',
            left: '100px',
          }}
        />
      </Space>
    </>
  );
};
