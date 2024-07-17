import { Link } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import { ROUTES } from '../../../app/routes/routes.data';
import { useTranslation } from 'react-i18next';
import LoginImg from '../../../shared/assets/images/cat.png';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={LoginImg}
                  alt="text"
                  className="rounded-circle"
                  style={{ maxHeight: '200px' }}
                ></img>
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('dontHaveAcc')}?</span> <Link to={ROUTES.SIGN_UP}>{t('signUp')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
