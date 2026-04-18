import type { Task, Priority } from './types';

const priorityWeight: Record<Priority, number> = {
  High: 100,
  Medium: 60,
  Low: 30,
};

export const getSmartRank = (task: Task) => {
  const now = new Date();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const urgency = dueDate
    ? Math.max(0, 30 - Math.round((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const statusBonus = task.status === 'done' ? -200 : task.status === 'in-progress' ? 30 : 0;
  return priorityWeight[task.priority] + urgency + statusBonus;
};

export const suggestCategory = (title: string) => {
  const normalized = title.toLowerCase();
  if (normalized.includes('call') || normalized.includes('email')) return 'Communication';
  if (normalized.includes('design') || normalized.includes('prototype')) return 'Design';
  if (normalized.includes('plan') || normalized.includes('review')) return 'Planning';
  if (normalized.includes('write') || normalized.includes('copy')) return 'Writing';
  return 'General';
};

export const buildSmartSummary = (tasks: Task[]) => {
  if (!tasks.length) return 'Add your first task to see smart suggestions.';

  const urgent = tasks
    .filter((task) => task.status !== 'done' && task.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];

  const highPriority = tasks.filter((task) => task.priority === 'High' && task.status !== 'done');

  if (urgent) {
    return `Focus on “${urgent.title}” first — it is due soon.`;
  }

  if (highPriority.length) {
    return `You have ${highPriority.length} high-priority task(s) waiting.`;
  }

  return 'Your task list is healthy. Keep planning and closing work!';
};
