import { observer } from 'mobx-react-lite';

import { LoginForm } from 'features/login-form';
import './login-page.scss';

const _LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Авторизация</h1>
      <LoginForm />
    </div>
  );
};

const LoginPage = observer(_LoginPage);

export default LoginPage;
