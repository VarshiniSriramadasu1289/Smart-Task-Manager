import type { Task } from '../lib/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onEdit: (taskId: string) => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function TaskList({ tasks, selectedTaskId, onEdit, onDelete, onUpdate }: TaskListProps) {
  if (!tasks.length) {
    return <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">No tasks match the current filters. Create a new task to get started.</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isSelected={task.id === selectedTaskId}
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}
          onToggleComplete={() =>
            onUpdate({
              ...task,
              status: task.status === 'done' ? 'todo' : 'done',
            })
          }
        />
      ))}
    </div>
  );
}

export default TaskList;
