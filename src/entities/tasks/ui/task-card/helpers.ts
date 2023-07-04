export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'высокий':
      return '_high';
    case 'средний':
      return '_medium';
    case 'низкий':
      return '_low';
    default:
      return '';
  }
};

export const getStatusColorByDeadline = (status: string, deadline: string) => {
  const currentDate = Date.now();

  if (status === 'выполнена') {
    return 'green';
  } else if ((status === 'к выполнению' || status === 'выполняется') && Date.parse(deadline) < currentDate) {
    return 'red';
  } else {
    return 'gray';
  }
};
