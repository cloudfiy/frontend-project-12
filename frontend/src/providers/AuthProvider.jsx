import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))
  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>
}

export default AuthProvider
