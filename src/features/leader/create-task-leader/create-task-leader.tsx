import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { formValidation, taskFormConfig } from './config';
import './create-task-leader.scss';

import { useStore } from 'app';

import { Button, SelectField, TextField } from 'shared/ui';

const _CreateTaskLeader = () => {
  const { prioritiesStore, leaderStore, sessionStore, tasksStore } = useStore();
  const currentUserId = sessionStore.viewer.id;
  const subordinatesList = [{ id: currentUserId, name: 'Назначить себя' }, ...leaderStore.subordinates];

  useEffect(() => {
    if (prioritiesStore.priorities.length === 0) {
      prioritiesStore.loadPriorities();
    }
  }, [prioritiesStore]);

  useEffect(() => {
    if (leaderStore.subordinates.length === 0) {
      leaderStore.loadSubordinates();
    }
  }, [leaderStore]);
  return (
    <Formik
      initialValues={taskFormConfig}
      validationSchema={formValidation}
      onSubmit={(values) => {
        tasksStore.createTask(values);
      }}
    >
      {(formik) => (
        <Form className="form-leader">
          <div className="form-leader__field">
            <TextField label="Заголовок" name="title" />
          </div>

          <div className="form-leader__field">
            <TextField type="" label="Описание" name="description" />
          </div>

          <div className="form-leader__field">
            <TextField type="date" label="Дата окончания" name="deadline" />
          </div>
          <Observer>
            {() => (
              <>
                <div className="form-leader__field">
                  <SelectField
                    label="Приоритет"
                    name="priority"
                    defaultOption="Выбрать..."
                    options={prioritiesStore.priorities}
                  />
                </div>

                <div className="form-leader__field">
                  <SelectField
                    label="Назначить ответственным"
                    name="responsible"
                    defaultOption="Назначить..."
                    options={subordinatesList}
                  />
                </div>
              </>
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

export const CreateTaskLeader = observer(_CreateTaskLeader);
