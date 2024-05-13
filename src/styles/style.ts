import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, appearance }) => ({
  layout: {
    width: '100%',
    height: '100%',
    backgroundColor: appearance === 'dark' ? 'black' : 'white',
    alignItems: 'center',
    overflowY: 'auto',
    justifyItems: 'center',
  },

  searchField: css`
      width: 350px;
      border-radius: 0px;
    `,

  themeSwitch: css`
      height: 27px;
      border: 1px solid black;
      font-weight: bold;
      background-color: white-smoke;
      left: 292px;
      bottom: 29px;
    `,

  githubOutlined: css`
      font-size: 36px;
      position: relative;
      color: ${appearance === 'dark' ? 'white' : 'black'};
      right: 50px;
      top: 105px;

    `,

  dropdownSelect: css`
      left: 360px;
      bottom: 40px;
    `,

  cards: css`
    text-align: center;
    position: relative;
  `,

  profileCard: css`
  width: 400px;
  flex-direction: row;
  bottom: 15px;
  left: 20px;
  border-radius: 0px;
  border: 1px solid ${appearance === 'dark' ? 'red' : 'blue'};
  `,

  reposCard: css`
      width: 400px;
      display: flex
      flex-direction: row;
      position: relative;
      align-content: center;
      left: 140px;
      border-radius: 0px;
      border: 1px solid ${appearance === 'dark' ? 'red' : 'blue'};
      
  `,

  homePageTitle: css`
     right: 5px;
     position: relative;
     top: 47px;

      `,

  githubPara: css`
      position: relative;
      right: 9px;
      top: 28px;
    `,

  flexHeight: css`
       height: 100%;
       align-items: center;
       `,

  withoutContent: css`
      width: 100%;
      height: 85%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position:relative;
  `,

  withContent: css`
      width: 100%;
      height: auto;
      justify-content: center;
      display: flex;
      flex-direction: column;
      position: relative;
      `,

  profileAvatar: css`
  position: relative;
  top: 10px;
  left: 140px;
      `,
}));
