import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SECTIONS = ['To Do', 'Doing', 'Review', 'Done'];

export default function TaskDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { tasks, updateTask, deleteTask } = useTasks();
    const originalTask = tasks.find((t) => t.id === id);

    if (!originalTask) {
        return <div className="p-6">Task not found.</div>;
    }

    const [taskState, setTaskState] = useState(originalTask);

    const handleSave = () => {
        console.log('Saving task:', taskState);
        updateTask(taskState);
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            deleteTask(taskState.id);
            navigate('/');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Task</h1>

            <label className="block font-semibold text-sm text-gray-600 mb-1">Title</label>
            <input
                type="text"
                value={taskState.title}
                onChange={(e) => setTaskState({ ...taskState, title: e.target.value })}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md text-sm"
            />

            <label className="block font-semibold text-sm text-gray-600 mb-1">Description</label>
            <textarea
                value={taskState.description}
                onChange={(e) => setTaskState({ ...taskState, description: e.target.value })}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md text-sm h-24"
            />

            <label className="block font-semibold text-sm text-gray-600 mb-1">Priority</label>
            <select
                value={taskState.priority}
                onChange={(e) => setTaskState({ ...taskState, priority: e.target.value })}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md text-sm"
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <label className="block font-semibold text-sm text-gray-600 mb-1">Assignee</label>
            <input
                type="text"
                value={taskState.assignee}
                onChange={(e) => setTaskState({ ...taskState, assignee: e.target.value })}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md text-sm"
            />

            <label className="block font-semibold text-sm text-gray-600 mb-1">Due Date</label>
            <div className="mb-4">
                <DatePicker
                    selected={new Date(taskState.dueDate)}
                    onChange={(date) =>
                        date && setTaskState({ ...taskState, dueDate: date.toISOString() })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
            </div>

            <label className="block font-semibold text-sm text-gray-600 mb-1">Section</label>
            <select
                value={taskState.section}
                onChange={(e) => setTaskState({ ...taskState, section: e.target.value })}
                className="w-full mb-6 p-2 border border-gray-300 rounded-md text-sm"
            >
                {SECTIONS.map((section) => (
                    <option key={section} value={section}>
                        {section}
                    </option>
                ))}
            </select>

            <div className="flex flex-wrap gap-3 mt-6">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold"
                >
                    Save Changes
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 font-semibold"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-semibold ml-auto"
                >
                    Delete Task
                </button>
            </div>
        </div>
    );
}
