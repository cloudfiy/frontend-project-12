import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

export const useCheckToken = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) dispatch(logout())
  }, [pathname, isAuth])
}
