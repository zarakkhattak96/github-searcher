// import './themes.styles.css';
import { createStyles, css } from 'antd-style';

export const useStyle = createStyles({
  layout: {
    // text: 'red',
    margin: '0',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // backgroundColor: 'red',
    // text: 'var(--text-primary)',
  },

  inputSpace: css`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
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
    left: 718px;
    bottom: 120px;
    background-color: black;
  `,

  githubOutlined: css`
    font-size: 30px;
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

  content: css`
    width: 100%;
    justify-content: center;
    background-color: red;
  `,

  body: css`
    display: flex;
    place-items: center;
    background-color: var(--background);
    color: var(--text-primary);
    margin: 0;
  `,

  navThemeSwitchSearch: css`
    width: 100%;
    left: 240px;
  `,

  homePageTitle: css`
    width: 100%;
    text-align: center;
    justify-content: center;
  `,

  reposCard: css`
    width: 100%;
    height: 100%;
  `,
});
