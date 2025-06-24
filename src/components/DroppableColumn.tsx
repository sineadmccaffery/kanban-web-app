import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ColumnType, TaskType } from '../types/types';
import DraggableTask from './DraggableTask';

type ColumnProps = {
  column: ColumnType;
  allTasks: TaskType[];
  onTaskPress?: (task: TaskType) => void;
};

export default function DroppableColumn({ column, allTasks, onTaskPress }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const tasks = allTasks.filter((task) => column.taskIds.includes(task.id));

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-xl p-4 mr-4 mt-4 w-[280px] min-h-[100px] shadow-md"
    >
      <h2 className="font-bold text-lg mb-4">{column.name}</h2>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} onPress={() => onTaskPress?.(task)} />
        ))}
      </SortableContext>
    </div>
  );
}
