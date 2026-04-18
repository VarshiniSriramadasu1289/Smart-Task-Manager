import type { Priority, Status, Task } from './types';

export const getTodayIso = () => new Date().toISOString().slice(0, 10);

export const formatDueDate = (dueDate: string) => {
  if (!dueDate) return 'No deadline';
  return new Date(dueDate).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getPriorityLabel = (priority: Priority) => {
  const labels: Record<Priority, string> = {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
  };
  return labels[priority];
};

export const getStatusLabel = (status: Status) => {
  const labels: Record<Status, string> = {
    todo: 'To do',
    'in-progress': 'In progress',
    done: 'Done',
  };
  return labels[status];
};

export const defaultFilter = {
  search: '',
  status: 'all' as const,
  priority: 'all' as const,
  category: '',
  dueSoon: false,
};

export const sortTasks = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    if (a.status !== b.status) {
      if (a.status === 'done') return 1;
      if (b.status === 'done') return -1;
      return a.status === 'in-progress' ? -1 : 1;
    }

    const dateA = a.dueDate || '9999-12-31';
    const dateB = b.dueDate || '9999-12-31';
    if (dateA !== dateB) return dateA.localeCompare(dateB);

    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};
