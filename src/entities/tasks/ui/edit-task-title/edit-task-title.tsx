import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { Edit } from '../icons';

import { useStore } from 'app';

import { Popup, TextField } from 'shared/ui';

import './edit-task-title.scss';

interface Props {
  isCreator: boolean;
  taskId: string;
  title: string;
}

const _EditTaskTitle = ({ isCreator, taskId, title }: Props) => {
  const configStatus = { default: '', success: 'Сохранено', error: 'Ошибка, попробуйте ещё раз' };
  const { tasksStore } = useStore();
  const [activeTitleEdit, setActiveTitleEdit] = useState(false);
  const [saveStatus, setSaveStatus] = useState(configStatus.default);
  const getClassMessage = () => {
    return `form-title__message${
      saveStatus === configStatus.success ? ' form-title__message_success' : ' form-title__message_error'
    }`;
  };
  const toggleTitleEdit = () => {
    setActiveTitleEdit((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{ title }}
      onSubmit={async ({ title }, action) => {
        try {
          await tasksStore.updateTitle({ title, task_id: taskId });

          action.resetForm({ values: { title } });
          toggleTitleEdit();
          setSaveStatus(configStatus.success);
        } catch (error) {
          setSaveStatus(configStatus.error);
          console.log(error);
        }
      }}
    >
      {() => (
        <>
          {activeTitleEdit ? (
            <Popup active={activeTitleEdit} handleClose={toggleTitleEdit}>
              <Form className="form-title">
                <TextField label="" name="title" />

                <button type="submit">сохранить</button>
              </Form>
            </Popup>
          ) : (
            <div className="form-title__field">
              <h3>{title}</h3>
              {isCreator && (
                <div className="form-title__icon">
                  <Edit className="form-title__icon" onClick={toggleTitleEdit} title="редактировать" />
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

export const EditTaskTitle = observer(_EditTaskTitle);
