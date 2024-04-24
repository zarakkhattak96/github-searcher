import './themes.styles.css';
import { createStyles, css } from 'antd-style';

export const useStyle = createStyles({
  inputSpace: {
    backgroundColor: 'var(--background)',
    justifyContent: 'center',
    margin: '0 auto',
  },

  searchField: {
    width: '500px',
    top: '80px',
    left: '200px',
  },

  themeSwitch: {
    width: '60px',
    height: '27px',
    border: '1px solid black',
    fontWeight: 'bold',
    left: '630px',
  },

  githubOutlined: {
    fontSize: '35px',
    color: 'var(--heading-color)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },

  githubTitle: {
    textAlign: 'center',
    // marginTop: '5px',
    display: 'flex',
    justifyContent: 'center',
  },

  dropdownSelect: {
    width: '90px',
    height: '30px',
    top: '40px',
    left: '720px',
  },

  content: {
    width: '100%',
    height: '100vh',
  },

  body: {
    margin: '0 auto',
    display: 'flex',
    placeItems: 'center',
    minWidth: '320px',
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    padding: '2rem',
  },

  navThemeSwitchSearch: {
    width: '500px',
    top: '70px',
    left: '100px',
  },
});
