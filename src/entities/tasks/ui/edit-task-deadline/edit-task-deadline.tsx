import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { Edit } from '../icons';

import { useStore } from 'app';

import { Popup, TextField } from 'shared/ui';

import './edit-task-deadline.scss';

interface Props {
  isCreator: boolean;
  taskId: string;
  deadline: string;
}

const _EditTaskDeadline = ({ isCreator, taskId, deadline }: Props) => {
  const configStatus = { default: '', success: 'Сохранено', error: 'Ошибка, попробуйте ещё раз' };
  const { tasksStore } = useStore();
  const [activeDeadlineEdit, setActiveDeadlineEdit] = useState(false);
  const [saveStatus, setSaveStatus] = useState(configStatus.default);

  const getClassMessage = () => {
    return `form-deadline__message${
      saveStatus === configStatus.success ? ' form-deadline__message_success' : ' form-deadline__message_error'
    }`;
  };

  const toggleDeadlineEdit = () => {
    setActiveDeadlineEdit((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{ deadline }}
      onSubmit={async ({ deadline }, action) => {
        try {
          await tasksStore.updateDeadline({ task_id: taskId, deadline });

          action.resetForm({ values: { deadline } });
          toggleDeadlineEdit();
          setSaveStatus(configStatus.success);
        } catch (error) {
          setSaveStatus(configStatus.error);
          console.log(error);
        }
      }}
    >
      {() => (
        <>
          {activeDeadlineEdit ? (
            <Popup active={activeDeadlineEdit} handleClose={toggleDeadlineEdit}>
              <Form className="form-deadline">
                <TextField label="Дата окончания" type="date" name="deadline" />

                <button type="submit">сохранить</button>
              </Form>
            </Popup>
          ) : (
            <div className="form-deadline__field">
              <h3>{deadline}</h3>
              {isCreator && (
                <div className="form-deadline__icon">
                  <Edit className="form-deadline__icon" onClick={toggleDeadlineEdit} title="редактировать" />
                </div>
              )}
              {saveStatus && <span className={getClassMessage()}>{saveStatus}</span>}
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export const EditTaskDeadline = observer(_EditTaskDeadline);
