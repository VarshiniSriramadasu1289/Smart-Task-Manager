import type { Task } from '../lib/types';

interface StatsPanelProps {
  tasks: Task[];
}

function StatsPanel({ tasks }: StatsPanelProps) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'done').length;
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
  const highPriority = tasks.filter((task) => task.priority === 'High' && task.status !== 'done').length;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Progress overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Snapshot</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Total tasks</p>
          <p className="mt-3 text-4xl font-semibold text-slate-950">{total}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Completed</p>
          <p className="mt-3 text-4xl font-semibold text-slate-950">{completed}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">In progress</p>
          <p className="mt-3 text-4xl font-semibold text-slate-950">{inProgress}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">High priority</p>
          <p className="mt-3 text-4xl font-semibold text-slate-950">{highPriority}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
