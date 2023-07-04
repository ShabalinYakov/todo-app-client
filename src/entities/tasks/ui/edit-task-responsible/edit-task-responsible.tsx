import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';
import { useState } from 'react';

import { Edit } from '../icons';

import { useStore } from 'app';

import { Responsible } from 'entities/tasks';

import { Popup, SelectField } from 'shared/ui';
import './edit-task-responsible.scss';

interface Props {
  taskId: string;
  viewerId: string;
  responsible: Responsible;
  subordinates: Responsible[];
}

const _EditTaskResponsible = ({ taskId, viewerId, responsible, subordinates }: Props) => {
  const configStatus = { default: '', success: 'Сохранено', error: 'Ошибка, попробуйте ещё раз' };
  const { tasksStore } = useStore();
  const responsibleList = [{ id: viewerId, name: 'Назначить себя' }, ...subordinates];
  const [activeResponsibleEdit, setActiveResponsibleEdit] = useState(false);
  const [saveStatus, setSaveStatus] = useState(configStatus.default);

  const getClassMessage = () => {
    return `form-responsible__message${
      saveStatus === configStatus.success ? ' form-responsible__message_success' : ' form-responsible__message_error'
    }`;
  };

  const toggleResponsibleEdit = () => {
    setActiveResponsibleEdit((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{ responsible: '' }}
      onSubmit={async ({ responsible }, action) => {
        try {
          await tasksStore.updateResponsibleTask({ task_id: taskId, responsible });

          action.resetForm({ values: { responsible } });
          toggleResponsibleEdit();
          setSaveStatus(configStatus.success);
        } catch (error) {
          setSaveStatus(configStatus.error);
          console.log(error);
        }
      }}
    >
      {() => (
        <>
          {activeResponsibleEdit ? (
            <Popup active={activeResponsibleEdit} handleClose={toggleResponsibleEdit}>
              <Form className="form-responsible">
                <Observer>
                  {() => (
                    <SelectField
                      defaultOption={responsible.name}
                      options={responsibleList}
                      label="Изменить ответственного"
                      name="responsible"
                    />
                  )}
                </Observer>
                <button type="submit">сохранить</button>
              </Form>
            </Popup>
          ) : (
            <div className="form-responsible__field">
              <h3>{responsible.name}</h3>
              <div className="form-responsible__icon">
                <Edit className="form-responsible__icon" onClick={toggleResponsibleEdit} title="редактировать" />
              </div>
              {saveStatus && <span className={getClassMessage()}>{saveStatus}</span>}
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export const EditTaskResponsible = observer(_EditTaskResponsible);
