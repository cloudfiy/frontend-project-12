import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { USER } from '../constants';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setUser({ username: null, token: null }));
    localStorage.removeItem(USER);
    navigate('/');
  };

  return logout;
};

export default useLogout;
