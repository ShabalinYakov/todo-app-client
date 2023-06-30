import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app';

import { Button, TextField } from 'shared/ui';

import './task-title.scss';

interface Props {
  taskId: string;
  title: string;
}

const _TaskTitle = ({ taskId, title }: Props) => {
  const { tasksStore } = useStore();

  return (
    <Formik
      initialValues={{
        title,
      }}
      onSubmit={({ title }) => {
        const payload = { title, task_id: taskId };
        tasksStore.updateTitle(payload);
      }}
    >
      {(formik) => (
        <Form className="form-creator">
          <TextField label="Заголовок" name="title" />

          <Button type="submit" disabled={!formik.isValid}>
            Редатировать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const TaskTitle = observer(_TaskTitle);
