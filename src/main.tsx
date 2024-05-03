import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/homepageContainer';
import './styles/index.css';
import { Provider } from 'react-redux';
import { persistedStore, store } from './app/store/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
);
