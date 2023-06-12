export const getEndOfDayInMs = () => {
  const currentDay = new Date();
  const endOfDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 23, 59, 59);
  return endOfDay.getTime();
};

export const getEndOfWeekInMs = () => {
  const currentDay = new Date();
  const dayEndOfWeek = new Date(
    currentDay.setDate(currentDay.getDate() - currentDay.getDay() + (currentDay.getDay() ? 7 : 0))
  );
  dayEndOfWeek.setHours(23, 59, 59);

  return dayEndOfWeek.getTime();
};
