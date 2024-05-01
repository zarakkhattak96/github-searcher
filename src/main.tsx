import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/homepageContainer';
import './styles/index.css';
import { Provider } from 'react-redux';
import { store } from './app/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Provider>,
);
