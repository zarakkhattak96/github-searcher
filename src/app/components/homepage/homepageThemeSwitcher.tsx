import { Col, Switch } from 'antd';
import { useStyle } from '../../../styles/style';
import { ThemeContext } from '../../../context/themeContext';
import { useContext } from 'react';

export const ThemeSwitcher = () => {
  const { styles } = useStyle();

  const { changeTheme } = useContext(ThemeContext);

  return (
    <Col push={22} span={4} offset={3}>
      <Switch
        checkedChildren='Dark'
        unCheckedChildren='Light'
        className={styles.themeSwitch}
        onChange={changeTheme}
      />
    </Col>
  );
};
