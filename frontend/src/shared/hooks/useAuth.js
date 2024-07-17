import { useEffect, useState } from 'react';
import { USER } from '../constants';

export function useAuth() {
  const storedToken = localStorage.getItem(USER);
  const [token, setToken] = useState(storedToken ? JSON.parse(storedToken) : null);
  const [isAuth, setIsAuth] = useState(!!token);

  useEffect(() => {
    if (!storedToken) {
      setIsAuth(false);
    } else {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);
      setIsAuth(!!parsedToken);
    }
  }, [storedToken]);

  return {
    isAuth,
    token,
  };
}
