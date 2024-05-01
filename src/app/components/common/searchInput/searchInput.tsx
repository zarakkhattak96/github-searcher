import { Col, Input, Row } from 'antd';
// import { ISearchInputProps } from '../../../../utils/interfaces.utils';
import { useStyle } from '../../../../styles/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import React from 'react';
import { changeSearchInput } from '../../slice';

export const SearchInputComponent = () => {
  const { styles } = useStyle();

  const selectFromStore = useSelector((state: RootState) => state.searchInput);
  const { username } = selectFromStore;
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    console.log(newValue, 'NEW VALUE');

    dispatch(changeSearchInput(newValue));

    // setUsername(newValue);
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
