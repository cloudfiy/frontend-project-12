import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { USER } from '../constants';

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setUser({ username: null, token: null }));
    localStorage.removeItem(USER);
    navigate('/');
  };

  return logout;
}
