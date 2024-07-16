import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../redux/store'
import router from './routes/Router'

import i18n from './i18n'
import { I18nextProvider } from 'react-i18next'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </I18nextProvider>
  )
}

export default App
