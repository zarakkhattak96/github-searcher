import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/App.css';
import HomePageContainer from './containers/homepage-container';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <NavBar /> */}
    {/* <ThemeSwitcher /> */}
    <HomePageContainer />
  </React.StrictMode>,
);
