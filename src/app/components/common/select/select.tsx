import { Col, Row, Select } from 'antd';
import { useStyle } from '../../../../styles/style';
import React from 'react';
import { ISelectComponentProps } from '../../../../utils/interfaces';

const selectOptions = [
  { value: 'user', label: 'User' },
  { value: 'repos', label: 'Repositories' },
];

export const SelectCommonComponent: React.FC<ISelectComponentProps> = ({
  debouncedProfile,
  debouncedRepos,
}) => {
  const { styles } = useStyle();

  const handleSelect = async (value: string) => {
    if (value === 'user') {
      debouncedProfile();
    } else if (value === 'repos') {
      debouncedRepos();
    }
  };

  return (
    <>
      <Row align='middle'>
        <Col className={styles.dropdownSelect}>
          <Select
            placeholder='User'
            options={selectOptions}
            size='large'
            onSelect={handleSelect}
          />
        </Col>
      </Row>
    </>
  );
};
