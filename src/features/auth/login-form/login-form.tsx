import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';

import { loginFormValidation, loginFormConfig } from './config';
import { TextField } from './text-field';
import './login-form.scss';

import { useStore } from 'app';

import { Button } from 'shared/ui';

const _LoginForm = () => {
  const { sessionStore } = useStore();
  const apiError = sessionStore.getError;
  return (
    <Formik
      initialValues={loginFormConfig}
      validationSchema={loginFormValidation}
      onSubmit={({ login, password }) => {
        sessionStore.login({ login, password });
      }}
    >
      {(formik) => (
        <Form className="login-form">
          <div className="login-form__field">
            <TextField label="Логин" name="login" error={apiError.code === 102 ? apiError.message : ''} />
          </div>
          <div className="login-form__field">
            <TextField
              type="password"
              label="Пароль"
              name="password"
              error={apiError.code === 103 ? apiError.message : ''}
            />
          </div>
          <Button type="submit" disabled={!formik.isValid}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const LoginForm = observer(_LoginForm);
