import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import i18n from 'i18next';

import store from '../redux/store';
import router from './routes/Router';
import resources from './locales';

const rollbarConfig = {
  accessToken: '7679e4da01824fbda1aaf72550f64fc9',
  environment: 'testenv',
};

leoProfanity.loadDictionary('en');
const ruDictionary = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDictionary);

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
