import { FieldHookConfig, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { ClassAttributes, InputHTMLAttributes, useState } from 'react';

import './login-form-field.scss';
import { LockIcon, UnlockIcon } from './icons';

interface Props {
  label: string;
  type?: string;
  error?: string;
}

const _LoginFormField = ({
  label,
  type = 'text',
  error,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword((prev) => !prev);
  };

  const getClassInput = () => {
    return `login-form-field__input${(meta.touched && meta.error) || error ? ' login-form-field__input_error' : ''}`;
  };

  return (
    <div className="login-form-field">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="login-form-field__input-container">
        <input className={getClassInput()} type={showPassword ? 'text' : type} id={props.name} {...field} {...props} />
        {meta.touched && meta.error && <span className="login-form-field__error-message">{meta.error}</span>}
        {error && <span className="login-form-field__api-error">{error}</span>}
        {type === 'password' && (
          <i className="login-form-field__password-icon-container" onClick={handleShow} title="показать/скрыть">
            {showPassword ? (
              <UnlockIcon className="login-form-field__password-icon" />
            ) : (
              <LockIcon className="login-form-field__password-icon" />
            )}
          </i>
        )}
      </div>
    </div>
  );
};

export const LoginFormField = observer(_LoginFormField);
