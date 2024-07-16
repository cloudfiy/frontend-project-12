import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(50, 'Слишком длинное!')
    .required('Обязательно'),
  password: Yup.string().min(4, 'Пароль должен быть не менее 4 символов').required('Обязательно'),
})

export default validationSchema
