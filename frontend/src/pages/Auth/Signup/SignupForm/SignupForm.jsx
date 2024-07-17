import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '../../../../redux/services/authApi';
import { FormError, InputField } from './components';
import handleSubmit from './utils/handleSubmit';
import useValidationSchemas from '../../../../shared/hooks/useValidationSchemas';

const SignupForm = () => {
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const initialValues = { username: '', password: '', confirmPassword: '' };

  const validationSchemas = useValidationSchemas();
  const validationSchema = validationSchemas.register;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) =>
        handleSubmit(values, actions, signup, setError, dispatch, navigate, t)
      }
    >
      {({ isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">Регистрация</h1>
          <FormError error={error} />
          <InputField name="username" type="text" placeholder="От 3 до 20 символов" label="username" />
          <InputField name="password" type="password" placeholder="Не менее 6 символов" label="password" />
          <InputField name="confirmPassword" type="password" placeholder="Пароли должны совпадать" label="confirmPassword" />
          <button type="submit" className="w-100 btn btn-outline-primary" disabled={isSubmitting}>
            {t('goSignUp')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
