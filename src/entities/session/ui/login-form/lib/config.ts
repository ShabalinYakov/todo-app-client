import * as yup from 'yup';

export const loginFormConfig = {
  login: '',
  password: '',
};

export const loginFormValidation = yup.object({
  login: yup.string().required('Введите логин'),
  password: yup.string().required('Введите пароль'),
});
