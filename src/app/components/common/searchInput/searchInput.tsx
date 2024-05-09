import { Col, Input, Row } from 'antd';
import { useStyle } from '../../../../styles/style';
import React from 'react';
import { ISearchInputProps } from '../../../../utils/interfaces';
import { useDebounce } from '../../../../hooks/debounce';

export const SearchInputComponent: React.FC<ISearchInputProps> = ({
  username,
  setUsername,
}) => {
  const { styles } = useStyle();

  const debouncedSetUsername = useDebounce(() => setUsername(username), 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // console.log(newValue, 'NEW VALUE');

    setUsername(newValue); // updates the local state immediately
    debouncedSetUsername(); // calling the debounced function to update username after user has stopped typing
  };

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
            onChange={handleInputChange}
            className={styles.searchField}
          />
        </Col>
      </Row>
    </>
  );
};
