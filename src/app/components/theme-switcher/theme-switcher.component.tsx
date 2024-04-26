import { Col, Row, Switch } from 'antd';
import { useStyle } from '../../../styles/style';
import { ThemeContext } from '../../../context/themeContext';
import { useContext } from 'react';

export const ThemeSwitcher = () => {
  const { styles } = useStyle();

  const { changeTheme } = useContext(ThemeContext);

  return (
    <Row>
      <Col>
        <Switch
          checkedChildren='Dark'
          unCheckedChildren='Light'
          size='default'
          className={styles.themeSwitch}
          onChange={changeTheme}
        />
      </Col>
    </Row>
  );
};
