import {createRoot} from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App.tsx';
import { initI18n } from './i18n';
import { installContentProtection } from './lib/contentProtection';
import './index.css';

const i18n = initI18n(
  typeof window !== 'undefined' ? window.location.search : undefined
);

// ENN-245 — casual copy / image-save friction (forms stay editable)
installContentProtection();

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
