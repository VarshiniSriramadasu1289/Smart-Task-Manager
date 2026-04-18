import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { defaultFilter, sortTasks } from '../lib/utils';
import { getSmartRank } from '../lib/smart';
import type { Task, TaskFilter } from '../lib/types';

const STORAGE_KEY = 'smart-task-manager.tasks';

const createTask = (base: Partial<Task> = {}): Task => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: base.title ?? '',
    description: base.description ?? '',
    dueDate: base.dueDate ?? '',
    priority: base.priority ?? 'Medium',
    category: base.category ?? 'General',
    status: base.status ?? 'todo',
    createdAt: base.createdAt ?? now,
    updatedAt: base.updatedAt ?? now,
  };
};

export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, initialTasks);

  const smartSorted = useMemo(() => {
    return [...tasks]
      .filter((task) => task.status !== 'done')
      .sort((a, b) => getSmartRank(b) - getSmartRank(a));
  }, [tasks]);

  const addTask = (task: Partial<Task>) => {
    setTasks((current) => sortTasks([...current, createTask(task)]));
  };

  const updateTask = (updated: Task) => {
    setTasks((current) =>
      sortTasks(
        current.map((task) =>
          task.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : task,
        ),
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  const filteredTasks = (filter: TaskFilter) => {
    return sortTasks(
      tasks.filter((task) => {
        const matchesSearch = [task.title, task.description, task.category]
          .join(' ')
          .toLowerCase()
          .includes(filter.search.toLowerCase());
        const matchesStatus = filter.status === 'all' || task.status === filter.status;
        const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
        const matchesCategory = !filter.category || task.category === filter.category;
        const matchesDueSoon =
          !filter.dueSoon ||
          (task.dueDate && new Date(task.dueDate) < new Date(Date.now() + 1000 * 60 * 60 * 24 * 4));
        return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesDueSoon;
      }),
    );
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    smartSorted,
    filteredTasks,
    defaultFilter,
  };
}
