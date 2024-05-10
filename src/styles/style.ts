import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, appearance }) => ({
  layout: {
    width: '100%',
    height: '100%',
    backgroundColor: appearance === 'dark' ? 'black' : 'white',
    alignItems: 'flex-start',
    overflowY: 'auto',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
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
  `,

  profileCard: css`
    width: 180px;
  `,

  reposCard: css`
      width: 160px;
      display: flex
      flex-direction: row;
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

  
  `,

  withContent: css`
      width: 100%;
      height: auto;
      justify-content: center;
      display: flex;
      flex-direction: column;
      `,
}));
