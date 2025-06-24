import { FaEdit } from "react-icons/fa";

const sectionColors: Record<string, string> = {
    'To Do': '#FFD166',
    'Doing': '#06D6A0',
    'Review': '#23acd9',
    'Done': '#8f9ca1',
};

const priorityOpacity: Record<string, number> = {
    Low: 0.3,
    Medium: 0.6,
    High: 1,
};

function hexToRgba(hex: string, opacity: number) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default function TaskCard({
    task,
    onPress,
}: {
    task: any;
    onPress: () => void;
}) {
    const baseColor = sectionColors[task.section] || '#ccc';
    const opacity = priorityOpacity[task.priority] || 1;
    const bgColor = hexToRgba(baseColor, opacity);

    return (
        <div
            className="relative rounded-xl p-4 mb-3 shadow-md"
            style={{ backgroundColor: bgColor }}
        >
            <button
                className="absolute top-2 right-2 p-1 z-10 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onPress();
                }}
                aria-label="Edit Task"
            >
                <FaEdit size={20} color="#333" />
            </button>
            <h3 className="text-base font-semibold mb-1 text-black">{task.title}</h3>
            <p className="text-sm text-gray-800">Priority: {task.priority}</p>
            <p className="text-sm text-gray-800">Assignee: {task.assignee}</p>
            <p className="text-sm text-gray-800">
                Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
        </div>
    );
}
