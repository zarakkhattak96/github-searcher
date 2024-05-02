import { Col, Row, Select } from 'antd';
import { useStyle } from '../../../../styles/style';
import React from 'react';
import { ISelectComponentProps } from '../../../../utils/interfaces';

export const SelectCommonComponent: React.FC<ISelectComponentProps> = ({
  debouncedProfile,
}) => {
  const { styles } = useStyle();

  return (
    <>
      <Row align='middle'>
        <Col className={styles.dropdownSelect}>
          <Select
            placeholder='User'
            options={[{ value: 'user', label: 'User' }]}
            size='large'
            onClick={debouncedProfile}
          />
        </Col>
      </Row>
    </>
  );
};
