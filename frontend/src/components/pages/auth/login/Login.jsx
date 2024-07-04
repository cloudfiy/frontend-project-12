import React from 'react'
import cn from 'classnames'
import LoginForm from './LoginForm/LoginForm'

const Login = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="" alt="text"></img>
              </div>
              <LoginForm />
            </div>
            <div class="card-footer p-4">
              <div class="text-center">
                <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
