import type { Priority, Status } from '../lib/types';
import type { TaskFilter } from '../lib/types';

interface FilterBarProps {
  categories: string[];
  priorities: Priority[];
  statuses: (Status | 'all')[];
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
}

function FilterBar({ categories, priorities, statuses, filter, onChange }: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Search</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500"
            type="search"
            placeholder="Search tasks"
            value={filter.search}
            onChange={(event) => onChange({ ...filter, search: event.target.value })}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Status</span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            value={filter.status}
            onChange={(event) => onChange({ ...filter, status: event.target.value as TaskFilter['status'] })}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'all' ? 'All statuses' : status.replace('-', ' ')}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Priority</span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            value={filter.priority}
            onChange={(event) => onChange({ ...filter, priority: event.target.value as TaskFilter['priority'] })}
          >
            <option value="all">All priorities</option>
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
            value={filter.category}
            onChange={(event) => onChange({ ...filter, category: event.target.value })}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            checked={filter.dueSoon}
            onChange={(event) => onChange({ ...filter, dueSoon: event.target.checked })}
          />
          Show due soon only
        </label>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          onClick={() => onChange({ search: '', status: 'all', priority: 'all', category: '', dueSoon: false })}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
