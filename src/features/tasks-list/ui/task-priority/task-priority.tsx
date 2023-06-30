import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';

import { useStore } from 'app';

import { Button, SelectField } from 'shared/ui';
import './task-priority.scss';

interface Props {
  taskId: string;
  priority: string;
}

const _TaskPriority = ({ taskId, priority }: Props) => {
  const { prioritiesStore, tasksStore } = useStore();
  const prioritiesList = prioritiesStore.priorities.filter((p) => p.name !== priority);

  return (
    <Formik
      initialValues={{
        priority: '',
      }}
      onSubmit={({ priority }) => {
        tasksStore.updatePriority({ task_id: taskId, priority });
      }}
    >
      {(formik) => (
        <Form className="form-creator">
          <Observer>
            {() => (
              <SelectField
                defaultOption={priority}
                options={prioritiesList}
                label="Изменить приоритет"
                name="priority"
              />
            )}
          </Observer>
          <Button type="submit" disabled={!formik.isValid}>
            Редатировать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const TaskPriority = observer(_TaskPriority);
