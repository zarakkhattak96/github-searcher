import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, appearance }) => ({
  layout: {
    width: '100%',
    height: '100%',
    backgroundColor: appearance === 'dark' ? 'black' : 'white',
    overflow: 'auto',
    padding: '1.5rem',
  },

  searchField: css`
      border-radius: 0px;
    `,

  themeSwitch: css`
      height: 27px;
      border: 1px solid black;
      font-weight: bold;
      background-color: white-smoke;
    `,

  githubOutlined: css`
      font-size: 36px;
      position: relative;
      color: ${appearance === 'dark' ? 'white' : 'black'};
      right: 15px;
      top: 125px;

    `,

  dropdownSelect: css`
      bottom: 40px;
    `,

  cards: css`
    text-align: center;
    position: relative;
  `,

  profileCard: css`
  width: 200px;
  display: flex
  flex-direction: row;
  position: relative;
  align-content: center;
  border-radius: 0px;
  border: 1px solid ${appearance === 'dark' ? 'red' : 'blue'};
  `,

  reposCard: css`
      width: 200px;
      display: flex
      flex-direction: row;
      position: relative;
      align-content: center;
      border-radius: 0px;
      border: 1px solid ${appearance === 'dark' ? 'red' : 'blue'};
      
  `,

  homePageTitle: css`
     left: 25px;
     position: relative;
     top: 65px;

      `,

  githubPara: css`
      position: relative;
      left: 25px;
      top: 50px;
    `,

  flexHeight: css`
       height: 100%;
       align-items: center;
       `,

  withoutContent: css`
      width: 100%;
      display: flex;
      flex-direction: column;
  `,

  withContent: css`
      width: 100%;
      `,

  profileAvatar: css`
  top: 10px;
  left: 50px;
      `,

  skeletonStyle: css`
  left: 550px;
  width: 200px;
  display: flex
  flex-direction: row;
  position: relative;
  align-content: center;
  color: ${appearance === 'dark' ? 'red' : 'blue'};
      
      `,
}));
