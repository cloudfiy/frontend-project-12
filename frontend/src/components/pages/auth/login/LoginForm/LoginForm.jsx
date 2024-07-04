import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useLoginMutation } from '../../../../../services/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../../../redux/slices/authSlice'

const LoginForm = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(2, 'Слишком короткое!')
          .max(50, 'Слишком длинное!')
          .required('Обязательно'),
        password: Yup.string()
          .min(4, 'Пароль должен быть не менее 4 символов')
          .required('Обязательно'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const result = await login(values).unwrap()
          console.log(values)
          console.log(result)
          localStorage.setItem('token', result.token)
          dispatch(loginSuccess(values))
          navigate('/')
        } catch (error) {
          console.error('Ошибка авторизации', error)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder="Ваш ник"
              id="username"
              className="form-control"
            />
            <label htmlFor="username">Ваш ник</label>
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required
              placeholder="Пароль"
              type="password"
              id="password"
              className="form-control"
            />
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
          >
            Войти
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
