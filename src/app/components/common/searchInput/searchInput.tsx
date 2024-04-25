import { Col, Input, Row } from 'antd';
import { ISearchInputProps } from '../../../../utils/interfaces.utils';
import { useStyle } from '../../../../styles/style';

export const SearchInputComponent: React.FC<ISearchInputProps> = ({
  username,
  setUsername,
}) => {
  const { styles } = useStyle();

  return (
    <>
      <Row className={styles.navThemeSwitchSearch}>
        <Col>
          <Input
            placeholder='Start typing here ..'
            maxLength={50}
            size='large'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.searchField}
          />
        </Col>
      </Row>
    </>
  );
};
