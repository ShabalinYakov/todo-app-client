import { FieldHookConfig, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { ClassAttributes, SelectHTMLAttributes } from 'react';
import './select-field.scss';

interface Props {
  label: string;
  defaultOption: string;
  options: { id: string; name: string }[];
}

const _SelectField = ({
  label,
  defaultOption,
  options,
  ...props
}: Props & SelectHTMLAttributes<HTMLSelectElement> & ClassAttributes<HTMLSelectElement> & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const getInputClasses = () => {
    return `select-field__select${meta.touched && meta.error ? ' select-field__select_error' : ''}`;
  };

  return (
    <div className="select-field">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="select-field__select-container">
        <select className={getInputClasses()} id={props.name} {...field} {...props}>
          <option disabled value="">
            {defaultOption}
          </option>
          {options.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {meta.touched && meta.error && <span className="select-field__error-message">{meta.error}</span>}
      </div>
    </div>
  );
};

export const SelectField = observer(_SelectField);
