import './themes.styles.css';
import { createStyles, css } from 'antd-style';

export const useStyle = createStyles({
  rootClass: {
    background: '#f2f2f2',
    textPrimary: {
      color: 'var(--text-primary)',
    },
    textSecondary: {
      color: 'var(--text-secondary)',
    },
    // '--text-primary': '#0f0f0f',
    // '--text-secondary': '#4e4e4e',
    accentColor: '#dfb017',
    accentHover: {
      color: 'var(--accent-hover)',
    },
    border: '#1f1e1e',
    boxShadow: '7px 15px 13px -4px #00000056',
  },

  rootId: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  },

  body: {
    // margin: 0,
    // display: 'flex',
    // placeItems: 'center',
    // minWidth: '320px',
    // minHeight: '100vh',
    width: 'auto',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
  },

  darkTheme: {
    headingColor: '#f2f2f2',
    background: '#1a1d21',
    textPrimary: {
      color: 'f2f2f2',
    },
    textSecondary: {
      color: '#a7a4a4',
    },
    accentHover: {
      color: '#5b4cbe',
    },
    // --text-primary: #f2f2f2,
    // --text-secondary: #a7a4a4,
    accentColor: '#6a5acd',
    // accentColorHover: '#5b4cbe',
    border: '#696969',
    boxShadow: '7px 15px 13px -4px #ffffff1b',
  },

  themeSwitch: {
    width: '60px',
    height: '25px',
    border: '1px solid black',
    textAlign: 'center',
    fontWeight: 'bold',
    left: '825px',
    bottom: '15px',
    display: 'flex',
    boxSizing: 'border-box',
  },

  githubOutlined: {
    fontSize: '45px',
    color: 'var(--heading-color)',
    display: 'flex',
  },

  homePageTitle: {
    color: 'var(--heading-color)',
  },

  titleParagraph: {
    fontSize: '14px',
    color: '#4e4e4e;',
  },

  searchInput: {
    width: '400px',
    height: '42px',
    left: '400px',
    bottom: '0px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignContent: 'center',
    borderRadius: '0',
  },

  dropdownSelect: {
    maxWidth: '80px',
    maxHeighteight: '100px',
    left: '410px',
  },
});
