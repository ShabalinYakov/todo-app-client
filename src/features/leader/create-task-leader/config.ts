import * as yup from 'yup';

export const taskFormConfig = {
  title: '',
  description: '',
  deadline: '',
  priority: '',
  responsible: '',
};

export const formValidation = yup.object({
  title: yup.string().required('Введите название задачи'),
  description: yup.string().required('Заполните описание задачи'),
  deadline: yup.string().required('Выберите дату окончания'),
  priority: yup.string().required('Выберите приоритет'),
  responsible: yup.string().required('Выберите ответственного'),
});
