import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Search from './app/components/search.component.tsx';
import NavBar from './app/components/navbar.component.tsx';
import { ThemeSwitcher } from './app/components/theme-switcher.component.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
    <ThemeSwitcher />
    <Search />
    <App />
  </React.StrictMode>,
);
