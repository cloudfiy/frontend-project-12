import { Link, Outlet } from 'react-router-dom';
import { useLogout } from '../shared/hooks/useLogout';
import { useAuth } from '../shared/hooks/useAuth';
import { ROUTES } from '../app/routes/routes.data';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  const { isAuth } = useAuth();
  const logout = useLogout();
  const { t } = useTranslation();

  return (
    <>
      <div className="h-100 bg-light" id="chat">
        <div className="d-flex flex-column h-100">
          <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <Link to={ROUTES.HOME} className="navbar-brand">
                Hexlet Chat
              </Link>
              {isAuth && (
                <button type="button" className="btn btn-primary" onClick={logout}>
                  {t('logout')}
                </button>
              )}
            </div>
          </div>
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Layout;
