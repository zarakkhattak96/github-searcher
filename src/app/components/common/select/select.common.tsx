import { Select } from 'antd';
import { useStyle } from '../../../../styles/style';
import React from 'react';
import { ISelectComponentProps } from '../../../../utils/interfaces.utils';

export const SelectCommonComponent: React.FC<ISelectComponentProps> = ({
  debouncedProfile,
}) => {
  const { styles } = useStyle();

  return (
    <Select
      placeholder='User'
      options={[{ value: 'user', label: 'User' }]}
      size='large'
      onClick={debouncedProfile}
      className={styles.dropdownSelect}
    />
  );
};
