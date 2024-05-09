import { Col, Input, Row } from 'antd';
import { useStyle } from '../../../../styles/style';
import React from 'react';
import { ISearchInputProps } from '../../../../utils/interfaces';
import { useDebounce } from '../../../../hooks/debounce';
import { fetchUserProfile } from '../../../../services/github';

export const SearchInputComponent: React.FC<ISearchInputProps> = ({
  username,
  setUsername,
}) => {
  const { styles } = useStyle();

  const handleInputChange = useDebounce(async (v: string) => {
    const newValue = v;

    if (newValue.length >= 3) {
      const userProf = await fetchUserProfile(newValue);

      console.log(userProf, 'PROF');
    }
  }, 300);

  return (
    <>
      <Row>
        <Col>
          <Input
            placeholder='Start typing here ..'
            maxLength={50}
            style={{
              position: 'relative',
            }}
            size='large'
            value={username}
            onChange={(e) => {
              const v = e.target.value;
              setUsername(e.target.value);
              handleInputChange(v);
            }}
            className={styles.searchField}
          />
        </Col>
      </Row>
    </>
  );
};
