import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../redux/store'
import router from './routes/Router'

import i18n from './i18n'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  )
}

export default App
