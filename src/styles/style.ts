import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css, appearance }) => ({
  layout: {
    margin: 0,
    width: '100%',
    height: '100vh',
    maxWidth: '1024px',
    backgroundColor: appearance === 'dark' ? 'black' : 'white',
  },

  inputSpace: css`
    // justifyContent: center;
  `,

  searchField: css`
    width: 500px;
    top: 120px;
    left: 430px;
    position: relative;
    display: flex;
    justify-content: center;
  `,

  themeSwitch: css`
    width: 60px;
    height: 27px;
    border: 1px solid black;
    font-weight: bold;
    left: 950px;
    top: 90px;
    position: relative;
    display: flex;
    justify-content: center;
    background-color: black;
  `,

  githubOutlined: css`
    width: 50px;
    font-size: 28px;
    color: var(--heading-color);
    text-align: center;
    display: flex;
    justify-content: center;
    text: var(--heading-color);
    position: relative;
    left: 594px;
    top: 162px;
  `,

  githubTitle: css`
    text-align: center;
    display: flex;
    justify-content: center;
    text: var(--text-color);
  `,

  dropdownSelect: css` 
    width: 90px;
    height: 30px;
    top: 80px;
    left: 730px;
    position: relative;
    margin: auto;
    display: flex;
    justify-content: center;
  `,

  cards: css`
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 100px;
`,

  profileCard: css`
  width: 180px;

`,

  reposCard: css`
  width: 180px;

`,

  homePageTitle: css`
    width: 100%;
    top: 110px;
    left: 220px;
    position: relative;
    display: flex;
    justify-content: center;
    `,

  githubPara: css`
  
    width: 100%;
    left: 620px;
    bottom: 100px;
  `,

  darkMode: css`
    // width: 60px;
    // height: 27px;
    // border: 1px solid black;
    // font-weight: bold;
    // left: 950px;
    // top: 90px;
    // position: relative;
    // display: flex;
    // justify-content: center;
    background-color: black;
  `,

  lightMode: css`
    // width: 60px;
    // height: 27px;
    // border: 1px solid black;
    // font-weight: bold;
    // left: 950px;
    // top: 90px;
    // position: relative;
    // display: flex;
    // justify-content: center;
    background-color: white;
  `,
}));
