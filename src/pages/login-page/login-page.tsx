import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import { AuthRedirect, LoginForm } from 'entities/session';

import './login-page.scss';

const _LoginPage = () => {
  return (
    <AuthRedirect>
      <Helmet>
        <title>Страница авторизации</title>
      </Helmet>
      <div className="login-page">
        <h1>Авторизация</h1>
        <LoginForm />
      </div>
    </AuthRedirect>
  );
};

const LoginPage = observer(_LoginPage);

export default LoginPage;
