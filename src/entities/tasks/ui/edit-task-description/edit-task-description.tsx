import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { Edit } from '../icons';

import { useStore } from 'app';

import { Popup, TextAreaField } from 'shared/ui';

import './edit-task-description.scss';

interface Props {
  isCreator: boolean;
  taskId: string;
  description: string;
}

const _EditTaskDescription = ({ isCreator, taskId, description }: Props) => {
  const configStatus = { default: '', success: 'Сохранено', error: 'Ошибка, попробуйте ещё раз' };
  const { tasksStore } = useStore();
  const [activeDescriptionEdit, setActiveDescriptionEdit] = useState(false);
  const [saveStatus, setSaveStatus] = useState(configStatus.default);

  const getClassMessage = () => {
    return `form-description__message${
      saveStatus === configStatus.success ? ' form-description__message_success' : ' form-description__message_error'
    }`;
  };

  const toggleDescriptionEdit = () => {
    setActiveDescriptionEdit((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        description,
      }}
      onSubmit={async ({ description }, action) => {
        try {
          await tasksStore.updateDescription({ task_id: taskId, description });

          action.resetForm({ values: { description } });
          toggleDescriptionEdit();
          setSaveStatus(configStatus.success);
        } catch (error) {
          setSaveStatus(configStatus.error);
          console.log(error);
        }
      }}
    >
      {() => (
        <>
          {activeDescriptionEdit ? (
            <Popup active={activeDescriptionEdit} handleClose={toggleDescriptionEdit}>
              <Form className="form-description">
                <TextAreaField label="Описание" name="description" />
                <button type="submit">сохранить</button>
              </Form>
            </Popup>
          ) : (
            <div className="form-description__field">
              <h3>{description}</h3>
              {isCreator && (
                <div className="form-description__icon">
                  <Edit className="form-description__icon" onClick={toggleDescriptionEdit} title="редактировать" />
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

export const EditTaskDescription = observer(_EditTaskDescription);
