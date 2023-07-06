import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { taskFormConfig, formValidation } from './config';
import './create-task-form.scss';

import { useStore } from 'app';

import { Subordinate } from 'entities/leader';

import { TextField, Button, SelectField, TextAreaField } from 'shared/ui';

interface Props {
  onClose: () => void;
}
const _CreateTaskForm = ({ onClose }: Props) => {
  const { prioritiesStore, leaderStore, sessionStore, tasksStore } = useStore();
  const { id: viewerId } = sessionStore.viewer;
  const responsibleList: Subordinate[] = [{ id: viewerId, name: 'Назначить себя' }];

  if (leaderStore) {
    leaderStore.subordinates.forEach((s) => responsibleList.push(s));
  }

  useEffect(() => {
    if (prioritiesStore.priorities.length === 0) prioritiesStore.loadPriorities();
  }, [prioritiesStore]);

  return (
    <Formik
      initialValues={taskFormConfig}
      validationSchema={formValidation}
      onSubmit={async (values) => {
        try {
          await tasksStore.createTask(viewerId, { ...values });
          if (!tasksStore.isLoading) {
            onClose();
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <Form className="create-task">
          <div className="create-task__field">
            <TextField label="Заголовок" name="title" />
          </div>
          <div className="create-task__field">
            <TextAreaField label="Описание" name="description" />
          </div>
          <div className="create-task__field">
            <TextField type="date" label="Дата окончания" name="deadline" />
          </div>
          <div className="create-task__field">
            <Observer>
              {() => (
                <SelectField
                  defaultOption="Выбрать..."
                  options={prioritiesStore.priorities}
                  label="Приоритет"
                  name="priority"
                />
              )}
            </Observer>
          </div>

          <Observer>
            {() => (
              <div className="create-task__field">
                <SelectField
                  label="Назначить ответственным"
                  name="responsible"
                  defaultOption="Выбрать..."
                  options={responsibleList}
                />
              </div>
            )}
          </Observer>
          <Button type="submit" disabled={!formik.isValid}>
            Создать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const CreateTaskForm = observer(_CreateTaskForm);
