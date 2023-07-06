import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useStore } from 'app';
import './edit-task-status.scss';

import { SelectField } from 'shared/ui';

interface Props {
  taskId: string;
  status: string;
  statusesArr: { id: string; name: string }[];
}

const _EditTaskStatus = ({ taskId, status, statusesArr }: Props) => {
  const configStatus = { default: '', success: 'Сохранено', error: 'Ошибка, попробуйте ещё раз' };
  const { tasksStore } = useStore();
  const statusesList = statusesArr.filter((s) => s.name !== status);
  const [saveStatus, setSaveStatus] = useState(configStatus.default);

  const getClassMessage = () => {
    return `form-status__message${
      saveStatus === configStatus.success ? ' form-status__message_success' : ' form-status__message_error'
    }`;
  };

  return (
    <Formik
      initialValues={{ status: '' }}
      onSubmit={async ({ status }, action) => {
        try {
          await tasksStore.updateStatus({ task_id: taskId, status });

          action.resetForm();
          setSaveStatus(configStatus.success);
        } catch (error) {
          setSaveStatus(configStatus.error);
          console.log(error);
        }
      }}
    >
      {() => (
        <Form className="form-status">
          <Observer>
            {() => <SelectField defaultOption={status} options={statusesList} label="Изменить статус" name="status" />}
          </Observer>
          <div className="form-status__wrapper">
            <button type="submit">сохранить</button>
            {saveStatus && <span className={getClassMessage()}>{saveStatus}</span>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const EditTaskStatus = observer(_EditTaskStatus);
