import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useCheckToken } from '../../hooks/useCheckToken'
import { useSelector } from 'react-redux'

const Layout = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  console.log(isAuth)
  useCheckToken()

  const logOutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
  }

  return (
    <div className="wrapper h-100 bg-light" id="chat">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand">Top chat</a>
              {isAuth && (
                <button type="button" class="btn btn-primary" onClick={logOutHandler}>
                  Выйти
                </button>
              )}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
