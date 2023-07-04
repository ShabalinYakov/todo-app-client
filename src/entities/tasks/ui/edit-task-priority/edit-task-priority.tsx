import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';
import { useState } from 'react';

import { Edit } from '../icons';

import { useStore } from 'app';

import { Popup, SelectField } from 'shared/ui';

import './edit-task-priority.scss';

interface Props {
  isCreator: boolean;
  taskId: string;
  priority: string;
  priorirtiesArr: { id: string; name: string }[];
}

const _EditTaskPriority = ({ isCreator, taskId, priority, priorirtiesArr }: Props) => {
  const configStatus = { default: '', success: 'Сохранено', error: 'Ошибка, попробуйте ещё раз' };
  const { tasksStore } = useStore();
  const [activePriorityEdit, setActivePriorityEdit] = useState(false);
  const prioritiesList = priorirtiesArr.filter((p) => p.name !== priority);
  const [saveStatus, setSaveStatus] = useState(configStatus.default);

  const getClassMessage = () => {
    return `form-priority__message${
      saveStatus === configStatus.success ? ' form-priority__message_success' : ' form-priority__message_error'
    }`;
  };

  const togglePriorityEdit = () => {
    setActivePriorityEdit((prev) => !prev);
  };
  return (
    <Formik
      initialValues={{
        priority: '',
      }}
      onSubmit={async ({ priority }, action) => {
        try {
          await tasksStore.updatePriority({ task_id: taskId, priority });

          action.resetForm({ values: { priority } });
          togglePriorityEdit();
          setSaveStatus(configStatus.success);
        } catch (error) {
          setSaveStatus(configStatus.error);
          console.log(error);
        }
      }}
    >
      {() => (
        <>
          {activePriorityEdit ? (
            <Observer>
              {() => (
                <Popup active={activePriorityEdit} handleClose={togglePriorityEdit}>
                  <Form className="form-priority">
                    <SelectField
                      defaultOption={priority}
                      options={prioritiesList}
                      label="Изменить приоритет"
                      name="priority"
                    />
                    <button type="submit">сохранить</button>
                  </Form>
                </Popup>
              )}
            </Observer>
          ) : (
            <div className="form-priority__field">
              <p>Приоритет: </p>
              <h3>{priority}</h3>
              {isCreator && (
                <div className="form-priority__icon">
                  <Edit className="form-priority__icon" onClick={togglePriorityEdit} title="редактировать" />
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

export const EditTaskPriority = observer(_EditTaskPriority);
