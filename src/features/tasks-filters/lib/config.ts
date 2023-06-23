import { FilterConfig } from 'entities/tasks';

export type Filter = {
  id: number;
  name: string;
  config: FilterConfig;
};

export const filters: Record<number, Filter> = {
  1: {
    id: 1,
    name: 'Все',
    config: 'all',
  },
  2: {
    id: 2,
    name: 'На сегодня',
    config: 'forToday',
  },
  3: {
    id: 3,
    name: 'На неделю',
    config: 'forWeek',
  },
  4: {
    id: 4,
    name: 'На будущее',
    config: 'forFuture',
  },
};

export const DEFAULT_FILTER = 1;

export const getFiltersList = () => Object.values(filters);

export const getFilterById = (id: number) => filters[id];
