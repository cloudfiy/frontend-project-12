import { ErrorMessage, Field, Form, Formik } from 'formik'
import validationSchema from './validationSchema'
import { useSignupMutation } from '../../../../redux/services/authApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../../../../redux/slices/userSlice'
import { USER } from '../../../../shared/constants'
import { ROUTES } from '../../../../app/routes/routes.data'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SignupForm = () => {
  const [signup] = useSignupMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { t } = useTranslation()

  const handleSubmit = async ({ username, password }, { setSubmitting }) => {
    setError('')
    try {
      const response = await signup({ username, password })
      if (response.error) {
        throw new Error('Conflict')
      }
      const data = response.data
      if (data) {
        const user = JSON.stringify(data)
        localStorage.setItem(USER, user)
        dispatch(setUser(data))
        navigate(ROUTES.HOME)
      }
    } catch (error) {
      if (error.message === 'Conflict') {
        setError(t('userExist'))
      } else {
        setError(t('signUpError'))
      }
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">Регистрация</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-floating mb-3">
            <Field
              placeholder="От 3 до 20 символов"
              name="username"
              autoComplete="username"
              required=""
              id="username"
              className="form-control"
            />
            <label className="form-label" htmlFor="username">
              {t('username')}
            </label>
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
          <div className="form-floating mb-3">
            <Field
              placeholder="Не менее 6 символов"
              name="password"
              aria-describedby="passwordHelpBlock"
              required=""
              autoComplete="new-password"
              type="password"
              id="password"
              className="form-control"
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
            <label className="form-label" htmlFor="password">
              {t('password')}
            </label>
          </div>
          <div className="form-floating mb-4">
            <Field
              placeholder="Пароли должны совпадать"
              name="confirmPassword"
              required=""
              autoComplete="new-password"
              type="password"
              id="confirmPassword"
              className="form-control"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            <label className="form-label" htmlFor="confirmPassword">
              {t('confirmPassword')}
            </label>
          </div>
          <button type="submit" className="w-100 btn btn-outline-primary" disabled={isSubmitting}>
            {t('goSignUp')}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm
