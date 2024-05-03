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
    background-color: white-smoke;
    left: 325px;
    bottom: 29px;
  `,

  githubOutlined: css`
    font-size: 36px;
    display: flex;
    justify-content: center;
    position: relative;
    color: ${appearance === 'dark' ? 'white' : 'black'};
    right: 170px;
    top: 107px;
    
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
   right: 40px;
   position: relative;
   top: 47px;

    `,

  githubPara: css`
    position: relative;
    right: 39px;
    top: 28px;
  `,

  flexHeight: css`
     height: 100%;
     position: relative;
     display: flex;
     justify-content: center;
     `,
}));
