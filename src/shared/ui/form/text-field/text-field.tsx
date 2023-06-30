import { FieldHookConfig, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { ClassAttributes, InputHTMLAttributes } from 'react';

import './text-field.scss';

interface Props {
  label: string;
  type?: string;
}

const _TextField = ({
  label,
  type = 'text',
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const getClassInput = () => {
    return `text-field__input${meta.touched && meta.error ? ' text-field__input_error' : ''}`;
  };

  return (
    <div className="text-field">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="text-field__input-container">
        <input className={getClassInput()} type={type} id={props.name} {...field} {...props} />
        {meta.touched && meta.error && <span className="text-field__error-message">{meta.error}</span>}
      </div>
    </div>
  );
};

export const TextField = observer(_TextField);
