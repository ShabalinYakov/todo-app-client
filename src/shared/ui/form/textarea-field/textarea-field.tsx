import { FieldHookConfig, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { ClassAttributes, InputHTMLAttributes } from 'react';
import './textarea-field.scss';

interface Props {
  label: string;
}

const _TextAreaField = ({
  label,
  ...props
}: Props &
  InputHTMLAttributes<HTMLTextAreaElement> &
  ClassAttributes<HTMLTextAreaElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const getClassInput = () => {
    return `textarea-field__area${meta.touched && meta.error ? ' textarea-field__area_error' : ''}`;
  };

  return (
    <div className="text-field">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="textarea-field__area-container">
        <textarea className={getClassInput()} id={props.name} {...field} {...props} />
        {meta.touched && meta.error && <span className="textarea-field__error-message">{meta.error}</span>}
      </div>
    </div>
  );
};

export const TextAreaField = observer(_TextAreaField);
