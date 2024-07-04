import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import { Provider } from 'react-redux'
import store from './redux/store'
import AuthProvider from './providers/AuthProvider'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
