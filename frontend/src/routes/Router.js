import Home from '../components/pages/home/Home'
import NotFound from '../components/pages/not-found/NotFound'
import Layout from '../components/layout/Layout'
import { ROUTES } from './routes.data'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/pages/auth/login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
])

export default router
