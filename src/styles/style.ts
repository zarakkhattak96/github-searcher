import { createStyles } from 'antd-style';

// export const darkTheme = {
//   token: {
//     colorFillContentHover: 'gray',
//     colorFillAlter: 'red',
//     colorFillContent: 'red',
//     colorBgContainerDisabled: 'red',
//     colorBgTextHover: 'red',
//   },
// };

export const useStyle = createStyles(({ css, appearance }) => ({
  layout: {
    margin: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: appearance === 'dark' ? 'black' : 'white',
    alignItems: 'center',
    overflowY: 'auto',
    position: 'relative',
    right: '20px',
  },

  searchField: css`
    position: relative;
    display: flex;
    justify-content: center;
    width: 400px;
    border-radius: 0px;
  `,

  themeSwitch: css`
    height: 27px;
    border: 1px solid black;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    background-color: black;
    left: 325px;
    bottom: 10px;
  `,

  githubOutlined: css`
    font-size: 26px;
    display: flex;
    justify-content: center;
    position: relative;
    color: ${appearance === 'dark' ? 'white' : 'black'};
    right: 95px;
    top: 52px;
    
  `,

  dropdownSelect: css` 
    height: 30px;
    left: 410px;
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
  width: 180px;
`,

  reposCard: css`
    width: 160px;
    display: flex
    flex-direction: row;
`,

  homePageTitle: css`
   left: 20px;
   position: relative;

    `,

  githubPara: css`
    position: relative;
    left: 6px;
    bottom: 15px;
  `,

  flexHeight: css`
     height: 100%;
     position: relative;
     display: flex;
     justify-content: center;
     `,
}));
