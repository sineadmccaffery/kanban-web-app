import type { TaskType as Task } from '../types/types';

let mockTasks: Task[] = [];

export const fetchTasks = async (): Promise<Task[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  if (mockTasks.length === 0) {
    const priorities = ['Low', 'Medium', 'High'];
    const sections = ['To Do', 'Doing', 'Review', 'Done'];

    mockTasks = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      assignee: `User ${i % 5 + 1}`,
      priority: priorities[i % 3],
      dueDate: new Date(Date.now() + i * 86400000).toISOString(),
      section: sections[i % 4],
    }));
  }

  return mockTasks;
};

export const saveTask = async (task: Task) => {
  const index = mockTasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    mockTasks[index] = task;
  } else {
    mockTasks.push(task);
  }
};

export const deleteTask = async (id: string) => {
  mockTasks = mockTasks.filter(task => task.id !== id);
};

  