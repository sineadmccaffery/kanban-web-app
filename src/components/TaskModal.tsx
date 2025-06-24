import { useState } from 'react';

export default function TaskModal({
    visible,
    onClose,
    onSubmit,
}: {
    visible: boolean;
    onClose: () => void;
    onSubmit: (task: any) => void;
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));

    const handleSubmit = () => {
        if (!title.trim()) return;

        onSubmit({
            id: `task-${Date.now()}`,
            title,
            description,
            assignee,
            priority,
            dueDate,
            section: 'To Do',
        });

        setTitle('');
        setDescription('');
        setAssignee('');
        setPriority('Medium');
        setDueDate(new Date().toISOString().slice(0, 10));
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4">New Task</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 p-3 rounded-lg border border-gray-300 bg-gray-50 text-sm"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-3 p-3 rounded-lg border border-gray-300 bg-gray-50 text-sm h-20"
                />

                <input
                    type="text"
                    placeholder="Assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full mb-3 p-3 rounded-lg border border-gray-300 bg-gray-50 text-sm"
                />

                <label className="block font-medium text-sm text-gray-600 mt-2 mb-1">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full mb-3 p-2 rounded-lg border border-gray-300 bg-gray-50 text-sm"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label className="block font-medium text-sm text-gray-600 mb-1">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full mb-4 p-2 rounded-lg border border-gray-300 text-sm"
                />

                <div className="flex justify-between gap-4 mt-6">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
