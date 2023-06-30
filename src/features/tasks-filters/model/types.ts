export type Filter = {
  id: number;
  name: string;
  config: FilterConfig;
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  creator: Creator;
  responsible: Responsible;
  created_at: string;
  updated_at: string;
}

export interface Creator {
  id: string;
  name: string;
}

export interface Responsible {
  id: string;
  name: string;
}

export type FilterConfig = 'all' | 'forToday' | 'forWeek' | 'forFuture';
