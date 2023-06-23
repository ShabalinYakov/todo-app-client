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
  creator: string;
  responsible: string;
  created_at: string;
  updated_at: string;
}

export type FilterConfig = 'all' | 'forToday' | 'forWeek' | 'forFuture';
