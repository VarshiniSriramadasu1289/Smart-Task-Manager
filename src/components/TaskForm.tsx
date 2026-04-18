import { useMemo, useState } from 'react';
import type { Priority, Status, Task } from '../lib/types';
import { getTodayIso } from '../lib/utils';
import { suggestCategory } from '../lib/smart';

interface TaskFormValues {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  category: string;
  status: Status;
}

interface TaskFormProps {
  categories: string[];
  priorities: Priority[];
  statuses: Status[];
  initialValues: Task | null;
  onSubmit: (values: TaskFormValues) => void;
  submitLabel?: string;
}

const EMPTY_VALUES: TaskFormValues = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  category: 'General',
  status: 'todo',
};

function TaskForm({ categories, priorities, statuses, initialValues, onSubmit, submitLabel }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(
    initialValues
      ? {
          title: initialValues.title,
          description: initialValues.description,
          dueDate: initialValues.dueDate,
          priority: initialValues.priority,
          category: initialValues.category,
          status: initialValues.status,
        }
      : EMPTY_VALUES,
  );

  const recommendedCategory = useMemo(
    () => (values.title ? suggestCategory(values.title) : 'General'),
    [values.title],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.title.trim()) return;
    onSubmit(values);
    if (!initialValues) setValues(EMPTY_VALUES);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Title</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
            value={values.title}
            onChange={(event) => setValues({ ...values, title: event.target.value })}
            placeholder="Write a task title"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Due date</span>
          <input
            type="date"
            min={getTodayIso()}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
            value={values.dueDate}
            onChange={(event) => setValues({ ...values, dueDate: event.target.value })}
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-700">
        <span>Description</span>
        <textarea
          className="min-h-[110px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
          value={values.description}
          onChange={(event) => setValues({ ...values, description: event.target.value })}
          placeholder="Add details, scope, or context"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Priority</span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            value={values.priority}
            onChange={(event) => setValues({ ...values, priority: event.target.value as Priority })}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span>Category</span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            value={values.category}
            onChange={(event) => setValues({ ...values, category: event.target.value })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span>Status</span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            value={values.status}
            onChange={(event) => setValues({ ...values, status: event.target.value as Status })}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Recommended category: <span className="font-semibold text-slate-700">{recommendedCategory}</span>
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          {submitLabel ?? (initialValues ? 'Save changes' : 'Add task')}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
