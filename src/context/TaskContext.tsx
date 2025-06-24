import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTasks } from '../api/mockApi';
import type { TaskType as Task } from '../types/types';

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTask: (updatedTask: Task) => void;
  fetchTasksFromApi: () => Promise<void>;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasksFromApi = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const updateTask = (updated: Task) => {
    setTasks(prev => {
      const newTasks = prev.map(task =>
        task.id === updated.id ? updated : task
      );
      console.log('Updated task list:', newTasks);
      return newTasks;
    });
  };
  

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  useEffect(() => {
    fetchTasksFromApi();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, updateTask, deleteTask, fetchTasksFromApi }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
}
