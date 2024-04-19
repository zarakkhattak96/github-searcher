import { Switch } from 'antd';
import { useTheme } from '../../custom-hooks/changetheme.hook';

export const ThemeSwitcher = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_theme, handleChange] = useTheme('light');

  // esLint error so theme is prefixed with "_"

  return (
    <Switch
      checkedChildren='Dark'
      unCheckedChildren='Light'
      size='default'
      style={{
        width: 60,
        height: 27,
        border: '1px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
        left: '250px',
        bottom: '10px',
        display: 'flex',
        boxSizing: 'border-box',
      }}
      className='container-switch'
      onChange={handleChange}
    />
  );
};
