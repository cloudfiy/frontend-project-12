import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ROUTES from '../../app/routes/routes.data';
import NotFoundImg from '../../shared/assets/images/notfound.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('pageNotFound')} src={NotFoundImg} style={{ maxHeight: '600px' }} />
      <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
      <p className="text-muted">
        {t('pageNotFoundRedirect1')}
        <Link to={ROUTES.HOME}>{t('pageNotFoundRedirect2')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
