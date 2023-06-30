import { Form, Formik } from 'formik';
import { Observer, observer } from 'mobx-react-lite';

import { useStore } from 'app';

import { Subordinate } from 'entities/leader';
import { Responsible } from 'entities/tasks';

import { Button, SelectField } from 'shared/ui';
import './task-responsible.scss';

interface Props {
  taskId: string;
  responsible: Responsible;
}

const _TaskResponsible = ({ taskId, responsible }: Props) => {
  const { leaderStore, sessionStore } = useStore();
  const responsibleList: Subordinate[] = [];

  if (sessionStore.viewer.is_leader) {
    leaderStore.subordinates.forEach((s) => {
      if (s.id !== responsible.id) {
        responsibleList.push(s);
      }
    });
  }

  return (
    <Formik
      initialValues={{ responsible: '' }}
      onSubmit={({ responsible }) => {
        leaderStore.updateResponsibleTask({ task_id: taskId, responsible });
      }}
    >
      {(formik) => (
        <Form className="form-creator">
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
          <Button type="submit" disabled={!formik.isValid}>
            Редатировать
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const TaskResponsible = observer(_TaskResponsible);
