import { Switch } from 'antd';
import { useTheme } from '../../../custom-hooks/changetheme.hook';
import { useStyle } from '../../../styles/style';

export const ThemeSwitcher = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_theme, handleChange] = useTheme('light');
  const { styles } = useStyle();

  // esLint error so theme is prefixed with "_"

  return (
    <Switch
      checkedChildren='Dark'
      unCheckedChildren='Light'
      size='default'
      className={styles.themeSwitch}
      onChange={handleChange}
    />
  );
};
