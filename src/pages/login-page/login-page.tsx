import { observer } from 'mobx-react-lite';

import { AuthRedirect } from 'features/auth-redirect';
import { LoginForm } from 'features/login-form';
import './login-page.scss';

const _LoginPage = () => {
  return (
    <AuthRedirect>
      <div className="login-page">
        <h1>Авторизация</h1>
        <LoginForm />
      </div>
    </AuthRedirect>
  );
};

const LoginPage = observer(_LoginPage);

export default LoginPage;
