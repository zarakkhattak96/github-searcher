import { Col, Row, Select } from 'antd';
import { useStyle } from '../../../../styles/style';
import React from 'react';
import {
  ISelectComponentProps,
  SelectedOptionType,
} from '../../../../utils/interfaces';

const selectOptions = [
  { value: 'user', label: 'User' },
  { value: 'repos', label: 'Repositories' },
];

export const SelectCommonComponent: React.FC<ISelectComponentProps> = ({
  handleChange,
  selectedOption,
  setSelectedOption,
}) => {
  const { styles } = useStyle();

  return (
    <Row align='middle'>
      <Col className={styles.dropdownSelect}>
        <Select
          placeholder='User'
          options={selectOptions}
          size='large'
          onChange={(e: SelectedOptionType) => {
            handleChange(e);
            setSelectedOption(e);
          }}
          value={selectedOption}
        />
      </Col>
    </Row>
  );
};
