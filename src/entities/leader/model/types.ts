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

export interface Subordinate {
  id: string;
  name: string;
}

export interface ResponsiblePayload {
  task_id: string;
  responsible: string;
}
export interface ResponsibleResponse {
  name: string;
}
