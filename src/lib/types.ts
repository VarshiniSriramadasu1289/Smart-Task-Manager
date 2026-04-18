export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  category: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  search: string;
  status: Status | 'all';
  priority: Priority | 'all';
  category: string;
  dueSoon: boolean;
}
