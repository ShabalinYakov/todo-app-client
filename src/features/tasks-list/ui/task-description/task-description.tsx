import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app';

import { Button, TextField } from 'shared/ui';

import './task-description.scss';

interface Props {
  taskId: string;
  description: string;
}

const _TaskDescription = ({ taskId, description }: Props) => {
  const { tasksStore } = useStore();
  return (
    <Formik
      initialValues={{
        description,
      }}
      onSubmit={({ description }) => {
        tasksStore.updateDescription({ task_id: taskId, description });
      }}
    >
      {(formik) => (
        <Form className="form-creator">
          <TextField label="Описание" name="description" />
          <Button type="submit" disabled={!formik.isValid}>
            Редатировать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const TaskDescription = observer(_TaskDescription);
