import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app';

import { Button, TextField } from 'shared/ui';
import './task-deadline.scss';

interface Props {
  taskId: string;
  deadline: string;
}

const _TaskDeadline = ({ taskId, deadline }: Props) => {
  const { tasksStore } = useStore();
  return (
    <Formik
      initialValues={{ deadline }}
      onSubmit={({ deadline }) => {
        tasksStore.updateDeadline({ task_id: taskId, deadline });
      }}
    >
      {(formik) => (
        <Form className="form-creator">
          <TextField label="Дата окончания" type="date" name="deadline" />

          <Button type="submit" disabled={!formik.isValid}>
            Редатировать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const TaskDeadline = observer(_TaskDeadline);
