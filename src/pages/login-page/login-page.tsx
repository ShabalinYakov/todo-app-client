import { observer } from 'mobx-react-lite';

import { AuthRedirect, LoginForm } from 'features/auth';
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
