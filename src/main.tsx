import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles/index.css';
// import './styles/App.css';
import App from './containers/homepage-container';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <NavBar /> */}
    {/* <ThemeSwitcher /> */}
    <App />
  </React.StrictMode>,
);
