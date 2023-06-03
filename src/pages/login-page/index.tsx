import { observer } from 'mobx-react-lite';

const _LoginPage = () => {
  return (
    <>
      <h1>Страница входа</h1>
    </>
  );
};

const LoginPage = observer(_LoginPage);

export default LoginPage;
