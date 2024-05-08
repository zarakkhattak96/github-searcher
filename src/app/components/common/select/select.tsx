import { Col, Row, Select } from 'antd';
import { useStyle } from '../../../../styles/style';
import React from 'react';
import { ISelectComponentProps } from '../../../../utils/interfaces';
import { fetchUserProfile, fetchUserRepos } from '../../../../services/github';

const selectOptions = [
  { value: 'user', label: 'User' },
  { value: 'repos', label: 'Repositories' },
];

export const SelectCommonComponent: React.FC<ISelectComponentProps> = ({
  debouncedProfile,
  username,
}) => {
  const { styles } = useStyle();

  const handleSelect = async (value: string) => {
    if (value === 'user') {
      const userProf = await fetchUserProfile(username);

      console.log(userProf.items[0], 'USER PROFILE123');
    } else if (value === 'repos') {
      // message.success('REPOS');

      const userRepos = await fetchUserRepos(username);

      console.log(userRepos, 'USE REPOS');
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
