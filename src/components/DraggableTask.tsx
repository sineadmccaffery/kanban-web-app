import { useSortable } from '@dnd-kit/sortable';
import type { TaskType } from '../types/types';
import TaskCard from './TaskCard';

type DraggableTaskProps = {
    task: TaskType;
    onPress: () => void;
};

export default function DraggableTask({ task, onPress }: DraggableTaskProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
        id: task.id,
        data: { task },
    });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        opacity: isDragging ? 0.7 : 1,
        transition: isDragging ? 'none' : 'transform 200ms ease',
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                onPress();
            }}
        >
            <TaskCard task={task} onPress={onPress} />
        </div>
    );
}
