import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Search from './app/components/search.component.tsx'
import NavBar from './app/components/navbar.component.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavBar/>
    <Search/>
    <App />
  </React.StrictMode>,
)
