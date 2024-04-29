import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, appearance }) => ({
  layout: {
    margin: '0px',
    width: '100%',
    // height: '100vh',
    backgroundColor: appearance === 'dark' ? 'black' : 'white',
    alignItems: 'center',
    // overflowY: 'scroll',
  },

  searchField: css`
    position: relative;
    display: flex;
    justify-content: center;
    width: 400px;
  `,

  themeSwitch: css`
    height: 27px;
    border: 1px solid black;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    background-color: black;
    left: 335px;
    bottom: 10px;
  `,

  githubOutlined: css`
    font-size: 28px;
    display: flex;
    justify-content: center;
    position: relative;
    color: ${appearance === 'dark' ? 'white' : 'black'};
    right: 115px;
    top: 52px;
    
  `,

  githubTitle: css`
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // background-color: ${appearance === 'dark' ? 'white' : 'black'};
  `,

  dropdownSelect: css` 
    height: 30px;
    left: 420px;
    bottom: 40px;
    position: relative;
    display: flex;
    justify-content: center;
  `,

  cards: css`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;
`,

  profileCard: css`
  // width: 180px;

`,

  reposCard: css`
    width: 160px;
    display: flex
    flex-direction: row;

`,

  homePageTitle: css`
    // position: relative;
    // display: flex;
    // justify-content: center;
    `,

  githubPara: css`
  
    // bottom: 100px;
  `,

  flexHeight: css`
     height: 100%;
     `,
}));
