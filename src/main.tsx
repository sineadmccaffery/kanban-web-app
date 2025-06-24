// main.tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from './context/TaskContext';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
);

