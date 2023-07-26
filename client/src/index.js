import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const root = createRoot(document.getElementById('root'));
root.render(
   <I18nextProvider i18n={i18n}>
      <App />
   </I18nextProvider>
);

serviceWorker.unregister();
