import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="wrapper h-100 bg-light" id="chat">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand">Top chat</a>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
