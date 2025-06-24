import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KanbanBoard from './screens/KanbanBoard';
import TaskDetail from './screens/TaskDetail';
import { TaskProvider } from './context/TaskContext';
import './index.css';

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}
