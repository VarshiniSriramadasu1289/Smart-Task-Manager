import { useMemo, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { buildSmartSummary } from '../lib/smart';
import { defaultFilter, formatDueDate, getPriorityLabel, getStatusLabel } from '../lib/utils';
import type { TaskFilter, Priority, Status } from '../lib/types';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import StatsPanel from '../components/StatsPanel';
import SmartPanel from '../components/SmartPanel';

interface HomePageProps {
  onNavigate: (page: 'login' | 'register' | 'home') => void;
}

const categories = ['General', 'Planning', 'Design', 'Communication', 'Writing'];
const priorities: Priority[] = ['High', 'Medium', 'Low'];
const statuses: Status[] = ['todo', 'in-progress', 'done'];

function HomePage({ onNavigate }: HomePageProps) {
  const { tasks, addTask, updateTask, deleteTask, smartSorted, filteredTasks } = useTasks([]);
  const { user, logout } = useAuth();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilter>(defaultFilter);

  const filtered = useMemo(() => filteredTasks(filter), [filter, filteredTasks]);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  const categoriesForFilter = useMemo(
    () => Array.from(new Set(['', ...tasks.map((task) => task.category)])),
    [tasks],
  );

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Smart Task Manager</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Organize, prioritize, and finish with clarity.</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="rounded-3xl bg-slate-100 px-5 py-4 text-slate-700 shadow-sm">
                <p className="text-sm">Welcome, {user?.name}</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{tasks.length} total tasks</p>
              </div>
              <button
                type="button"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">New task</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Add a task in seconds</h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-500">
                  Smart default categories and a priority-first workflow helps keep the most important work visible.
                </p>
              </div>
              <TaskForm
                categories={categories}
                priorities={priorities}
                statuses={statuses}
                onSubmit={(task) => {
                  addTask(task);
                  setSelectedTaskId(null);
                }}
                initialValues={null}
              />
            </div>

            <SmartPanel summary={buildSmartSummary(tasks)} />

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Task filters</p>
                  <h2 className="text-2xl font-semibold text-slate-950">Find focus by status, priority, or category</h2>
                </div>
                <p className="text-sm text-slate-500">Search, filter, and stay on top of what matters right now.</p>
              </div>
              <FilterBar
                categories={categoriesForFilter}
                priorities={priorities}
                statuses={['all', ...statuses]}
                filter={filter}
                onChange={setFilter}
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Task board</p>
                  <h2 className="text-2xl font-semibold text-slate-950">Your active task list</h2>
                </div>
                <p className="text-sm text-slate-500">
                  Showing {filtered.length} task{filtered.length === 1 ? '' : 's'} by current filters.
                </p>
              </div>
              <TaskList
                tasks={filtered}
                selectedTaskId={selectedTaskId}
                onEdit={setSelectedTaskId}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            </div>
          </section>

          <aside className="space-y-6">
            <StatsPanel tasks={tasks} />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Selected task</p>
                <h2 className="text-2xl font-semibold text-slate-950">Quick edit</h2>
              </div>
              {selectedTask ? (
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Editing task</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedTask.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{selectedTask.description}</p>
                    <p className="mt-3 text-sm text-slate-500">Due {formatDueDate(selectedTask.dueDate)}</p>
                  </div>
                  <TaskForm
                    categories={categories}
                    priorities={priorities}
                    statuses={statuses}
                    onSubmit={(updated) => {
                      updateTask({ ...selectedTask, ...updated, id: selectedTask.id });
                      setSelectedTaskId(null);
                    }}
                    initialValues={selectedTask}
                    submitLabel="Update task"
                  />
                </div>
              ) : (
                <div className="rounded-3xl bg-slate-50 p-6 text-slate-600">
                  <p className="text-sm">Choose a task from the list to edit it instantly.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
