import type { Task } from '../lib/types';
import { formatDueDate, getPriorityLabel, getStatusLabel } from '../lib/utils';

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onEdit: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
}

const statusStyles: Record<Task['status'], string> = {
  todo: 'bg-amber-100 text-amber-800',
  'in-progress': 'bg-sky-100 text-sky-800',
  done: 'bg-emerald-100 text-emerald-800',
};

function TaskItem({ task, isSelected, onEdit, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <div className={`rounded-3xl border p-5 shadow-sm transition ${isSelected ? 'border-sky-500 ring-1 ring-sky-200' : 'border-slate-200'} bg-white`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">{task.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{getPriorityLabel(task.priority)}</span>
            <span className={`rounded-full px-3 py-1 ${statusStyles[task.status]}`}>{getStatusLabel(task.status)}</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{task.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{task.description || 'No description provided.'}</p>
            </div>
            <p className="text-sm text-slate-500">Due {formatDueDate(task.dueDate)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            onClick={onToggleComplete}
          >
            {task.status === 'done' ? 'Undo' : 'Complete'}
          </button>
          <button
            type="button"
            className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
