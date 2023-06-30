import { FieldHookConfig, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { ClassAttributes, InputHTMLAttributes, useState } from 'react';

import './text-field.scss';
import { LockIcon, UnlockIcon } from './icons';

interface TextFieldProps {
  label: string;
  type?: string;
  error?: string;
}

const _TextField = ({
  label,
  type = 'text',
  error,
  ...props
}: TextFieldProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword((prev) => !prev);
  };

  const getClassInput = () => {
    return `text-field__input${(meta.touched && meta.error) || error ? ' text-field__input_error' : ''}`;
  };

  return (
    <div className="text-field">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="text-field__input-container">
        <input className={getClassInput()} type={showPassword ? 'text' : type} id={props.name} {...field} {...props} />
        {meta.touched && meta.error && <span className="text-field__error-message">{meta.error}</span>}
        {error && <span className="text-field__api-error">{error}</span>}
        {type === 'password' && (
          <i className="text-field__password-icon-container" onClick={handleShow} title="показать/скрыть">
            {showPassword ? (
              <UnlockIcon className="text-field__password-icon" />
            ) : (
              <LockIcon className="text-field__password-icon" />
            )}
          </i>
        )}
      </div>
    </div>
  );
};

export const TextField = observer(_TextField);
