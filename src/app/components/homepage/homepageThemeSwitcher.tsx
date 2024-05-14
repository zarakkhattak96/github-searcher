import { Col, Row, Switch } from 'antd';
import { useStyle } from '../../../styles/style';
import { ThemeContext } from '../../../context/themeContext';
import { useContext } from 'react';

export const ThemeSwitcher = () => {
  const { styles } = useStyle();

  const { changeTheme } = useContext(ThemeContext);

  return (
    <Row align={'top'} justify={'end'}>
      <Col push={5} span={2}>
        <Switch
          checkedChildren='Dark'
          unCheckedChildren='Light'
          className={styles.themeSwitch}
          onChange={changeTheme}
        />
      </Col>
    </Row>
  );
};
