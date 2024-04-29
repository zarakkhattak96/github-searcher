import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, appearance }) => ({
  layout: {
    margin: '0px',
    width: '100%',
    // height: '100vh',
    // maxWidth: '2096px',
    backgroundColor: appearance === 'dark' ? 'black' : 'white',
    alignItems: 'center',
    // justifyContent: 'center',
    // position: 'relative',
    // overflowY: 'scroll',
  },

  searchField: css`
    // position: relative;
    // display: flex;
    // justify-content: center;
  `,

  themeSwitch: css`
    // height: 27px;
    // border: 1px solid black;
    // font-weight: bold;
    // position: relative;
    // display: flex;
    // justify-content: center;
    // background-color: black;
  `,

  githubOutlined: css`
    font-size: 28px;
    // color: var(--heading-color);
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // text: var(--heading-color);
    // position: relative;
       color: ${appearance === 'dark' ? 'white' : 'black'};
    
  `,

  githubTitle: css`
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // background-color: ${appearance === 'dark' ? 'white' : 'black'};
  `,

  dropdownSelect: css` 
    // height: 30px;
    // left: 300px;
    // position: relative;
    // margin: auto;
    // display: flex;
    // justify-content: center;
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
