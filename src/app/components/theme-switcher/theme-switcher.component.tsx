import { Col, Row, Switch } from 'antd';
// import { useTheme } from '../../../custom-hooks/changetheme.hook';
import { useStyle } from '../../../styles/style';
import { useTheme } from '../../../custom-hooks/changetheme.hook';

export const ThemeSwitcher = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [_theme, handleChange] = useTheme('light');
  const { styles } = useStyle();
  const { theme, toggleTheme } = useTheme();

  // esLint error so theme is prefixed with "_"

  return (
    <Row>
      <Col span={24}>
        <Switch
          checkedChildren='Dark'
          unCheckedChildren='Light'
          size='default'
          className={styles.themeSwitch}
          onChange={toggleTheme}
        />
      </Col>
    </Row>
  );
};
