import { createStyles, css } from 'antd-style';

export const useStyle = createStyles({
  layout: {
    // text: 'red',
    margin: 0,
    // width: '100%',
    // height: '100%',
    // alignItems: 'center',
    // backgroundColor: 'red',
    // text: 'var(--text-primary)',
  },

  inputSpace: css`
    // justifyContent: center;
  `,

  searchField: css`
    width: 500px;
    top: 80px;
    left: 200px;
    position: relative;
    display: flex;
    justify-content: center;
  `,

  themeSwitch: css`
    width: 60px;
    height: 27px;
    border: 1px solid black;
    font-weight: bold;
    left: 720px;
    top: 60px;
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
    left: 320px;
    top: 165px;
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
    top: 40px;
    left: 500px;
    position: relative;
    margin: auto;
    display: flex;
    justify-content: center;
  `,

  // content: css`
  //   width: 100%;
  //   justify-content: center;
  //   background-color: red;
  // `,

  // body: css`
  //   display: flex;
  //   place-items: center;
  //   background-color: var(--background);
  //   color: var(--text-primary);
  //   margin: '0',
  // `,

  // navThemeSwitchSearch: css`
  //   width: '100%',
  //   top: '70px',
  //   left: '240px',
  // `,

  homePageTitle: css`
    width: 100%;
    top: 110px;
    right: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    `,

  githubPara: css`
  
    width: 100%;
    left: 350px;
    bottom: 100px;
  `,
});
