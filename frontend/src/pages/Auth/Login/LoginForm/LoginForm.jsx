import { Formik, Form, Field, ErrorMessage } from 'formik'
import validationSchema from './validation/validationSchema'

import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../../redux/services/authApi'
import { USER } from '../../../../shared/constants'
import { useTranslation } from 'react-i18next'

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = async (value, { setSubmitting }) => {
    try {
      const result = await login(value).unwrap()
      localStorage.setItem(USER, JSON.stringify(result))
      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{t('loading')}...</span>
        </div>
      </div>
    )
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('login')}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder={t('yourNickName')}
              id="username"
              className="form-control"
            />
            <label htmlFor="username">{t('yourNickName')}</label>
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required
              placeholder="password"
              type="password"
              id="password"
              className="form-control"
            />
            <label className="form-label" htmlFor="password">
              {t('password')}
            </label>
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
          >
            {t('login')}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm