import './themes.styles.css';
import { createStyles } from 'antd-style';

export const useStyle = createStyles({
  inputSpace: {
    backgroundColor: 'var(--background)',
    justifyContent: 'center',
  },

  searchField: {
    width: '500px',
    top: '80px',
    left: '200px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },

  themeSwitch: {
    width: '60px',
    height: '27px',
    border: '1px solid black',
    fontWeight: 'bold',
    left: '480px',
    backgroundColor: 'black',
  },

  githubOutlined: {
    fontSize: '28px',
    color: 'var(--heading-color)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    text: 'var(--heading-color)',
  },

  githubTitle: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    text: 'var(--text-color)',
  },

  dropdownSelect: {
    width: '90px',
    height: '30px',
    top: '40px',
    left: '500px',
    position: 'relative',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },

  content: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'red',
  },

  body: {
    display: 'flex',
    placeItems: 'center',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    margin: '0',
  },

  navThemeSwitchSearch: {
    width: '100%',
    top: '70px',
    left: '240px',
  },

  homePageTitle: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },

  reposCard: {
    width: '100%',
    height: '100%',
  },

  root: {
    margin: ' auto',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // backgroundColor: 'red',
    text: 'var(--text-primary)',
  },
});
