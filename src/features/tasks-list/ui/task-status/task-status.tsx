import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';

import { useStore } from 'app';
import './task-status.scss';

import { Button, SelectField } from 'shared/ui';

interface Props {
  taskId: string;
  status: string;
}

const _TaskStatus = ({ taskId, status }: Props) => {
  const { statusesStore, tasksStore } = useStore();
  const statusesList = statusesStore.statuses.filter((s) => s.name !== status);

  return (
    <Formik
      initialValues={{ status: '' }}
      onSubmit={async ({ status }) => {
        tasksStore.updateStatus({ task_id: taskId, status });
      }}
    >
      {(formik) => (
        <Form className="form-viewer">
          <Observer>
            {() => <SelectField defaultOption={status} options={statusesList} label="Изменить статус" name="status" />}
          </Observer>
          <Button type="submit" disabled={!formik.isValid}>
            Редатировать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const TaskStatus = observer(_TaskStatus);
