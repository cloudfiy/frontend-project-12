import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Слишком короткое!')
    .max(50, 'Слишком длинное!')
    .required('Обязательно'),
  password: Yup.string().min(6, 'Пароль должен быть не менее 4 символов').required('Обязательно'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Пароли должны совпадать'),
})

export default validationSchema
