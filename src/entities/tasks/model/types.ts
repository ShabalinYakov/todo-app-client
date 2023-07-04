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

export interface TaskPayload {
  title: string;
  description: string;
  priority: string;
  deadline: string;
  responsible: string;
}

export interface TitleData {
  task_id: string;
  title: string;
}

export interface DescriptionData {
  task_id: string;
  description: string;
}
export interface DeadlineData {
  task_id: string;
  deadline: string;
}

export interface PriorityPayload {
  task_id: string;
  priority: string;
}
export interface PriorityResponse {
  name: string;
}

export interface StatusPayload {
  task_id: string;
  status: string;
}
export interface StatusResponse {
  name: string;
}

export interface ResponsiblePayload {
  task_id: string;
  responsible: string;
}
export interface ResponsibleResponse {
  name: string;
}