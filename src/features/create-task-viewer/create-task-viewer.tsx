import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { taskFormConfig, formValidation } from './config';
import './create-task-viewer.scss';

import { useStore } from 'app';

import { TextField, Button, SelectField } from 'shared/ui';

interface Props {
  onClose: () => void;
}
const _CreateTaskViewer = ({ onClose }: Props) => {
  const { prioritiesStore, tasksStore, sessionStore } = useStore();

  useEffect(() => {
    if (prioritiesStore.priorities.length === 0) prioritiesStore.loadPriorities();
  }, [prioritiesStore]);

  return (
    <Formik
      initialValues={taskFormConfig}
      validationSchema={formValidation}
      onSubmit={async (values) => {
        try {
          await tasksStore.createTask({ responsible: sessionStore.viewer.id, ...values });
          if (!tasksStore.isLoading) {
            onClose();
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <Form className="form-viewer">
          <div className="form-viewer__field">
            <TextField label="Заголовок" name="title" />
          </div>
          <div className="form-viewer__field">
            <TextField label="Описание" name="description" />
          </div>
          <div className="form-viewer__field">
            <TextField type="date" label="Дата окончания" name="deadline" />
          </div>
          <div className="form-viewer__field">
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
          <Button type="submit" disabled={!formik.isValid}>
            Создать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const CreateTaskViewer = observer(_CreateTaskViewer);
