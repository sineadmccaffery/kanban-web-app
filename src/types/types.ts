export type ColumnId = 'todo' | 'inprogress' | 'review' | 'done';

export type TaskType = {
    id: string;
    title: string;
    description: string;
    assignee: string;
    priority: string;
    dueDate: string;
    section: string;
};

export type ColumnType = {
    id: string;
    name: string;
    taskIds: string[];
};

export type BoardData = {
    columns: Record<ColumnId, ColumnType>;
    tasks: Record<string, TaskType>;
};
