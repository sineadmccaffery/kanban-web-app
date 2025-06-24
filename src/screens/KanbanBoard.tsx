import { DragOverlay, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { fetchTasks } from '../api/mockApi';
import DroppableColumn from '../components/DroppableColumn';
import FilterBar from '../components/FilterBar';
import TaskModal from '../components/TaskModal';
import { useTasks } from '../context/TaskContext';
import type { ColumnType, TaskType } from '../types/types';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import TaskCard from '../components/TaskCard';


const SECTIONS = ['To Do', 'Doing', 'Review', 'Done'];

export default function KanbanBoard({ }: any) {
    const { tasks, setTasks } = useTasks();
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTask, setActiveTask] = useState<TaskType | null>(null);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        section: '',
        priority: '',
        assignee: '',
    });
    const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | ''>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );

    useEffect(() => {
        if (tasks.length === 0) {
            const loadTasks = async () => {
                const data = await fetchTasks();
                setTasks(data);
                setLoading(false);
            };
            loadTasks();
        } else {
            setLoading(false);
        }
    }, []);

    const filteredTasks = useMemo(() => {
        let filtered = tasks.filter(task =>
            (!filters.section || task.section.toLowerCase() === filters.section.toLowerCase()) &&
            (!filters.priority || task.priority.toLowerCase() === filters.priority.toLowerCase()) &&
            (!filters.assignee || task.assignee.toLowerCase().includes(filters.assignee.toLowerCase()))
        );

        if (sortBy === 'dueDate') {
            filtered.sort((a, b) => {
                const aDate = new Date(a.dueDate).getTime();
                const bDate = new Date(b.dueDate).getTime();
                return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
            });
        }

        if (sortBy === 'priority') {
            const priorityOrder = { Low: 1, Medium: 2, High: 3 };
            filtered.sort((a, b) => {
                return sortOrder === 'asc'
                    ? priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
                    : priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
            });
        }

        return filtered;
    }, [tasks, filters, sortBy, sortOrder]);

    const sectionedTasks = SECTIONS.reduce((acc, section) => {
        acc[section] = filteredTasks.filter(task => task.section === section);
        return acc;
    }, {} as Record<string, TaskType[]>);

    const handleDragEnd = (event: DragEndEvent) => {
        console.log('DRAG EVENT:', event);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        const activeTask = tasks.find(t => t.id === activeId);
        if (!activeTask) return;

        const overTask = tasks.find(t => t.id === overId);
        const destinationSection = SECTIONS.includes(overId)
            ? overId
            : overTask?.section;

        if (!destinationSection) return;

        const isSameSection = activeTask.section === destinationSection;

        if (isSameSection) {
            const sectionTasks = tasks.filter(t => t.section === destinationSection);
            const oldIndex = sectionTasks.findIndex(t => t.id === activeId);
            const newIndex = sectionTasks.findIndex(t => t.id === overId);

            if (oldIndex === -1 || newIndex === -1) return;

            const reordered = arrayMove(sectionTasks, oldIndex, newIndex);

            const updated = tasks.map(task => {
                if (task.section !== destinationSection) return task;
                return reordered.find(t => t.id === task.id) || task;
            });

            setTasks(updated);
        } else {
            const updated = tasks.map(task =>
                task.id === activeId ? { ...task, section: destinationSection } : task
            );
            setTasks(updated);
        }
    };



    if (loading) {
        return (
            <div className='className="flex justify-center items-center h-screen"'>
                <div className="w-8 h-8 border-4 border-t-transparent border-black rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="p-3 bg-white border-b border-gray-300 z-10">
                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
            </div>

            <DndContext
                onDragStart={({ active }) => {
                    const dragged = tasks.find(t => t.id === active.id);
                    if (dragged) setActiveTask(dragged);
                }}
                onDragEnd={handleDragEnd}
                onDragCancel={() => setActiveTask(null)}
            >
                <div className="flex flex-row items-start justify-center gap-4 overflow-x-auto p-4">
                    {SECTIONS.map((section) => {
                        return (
                            <DroppableColumn
                                key={section}
                                column={{
                                    id: section,
                                    name: section,
                                    taskIds: filteredTasks
                                        .filter(t => t.section === section)
                                        .map(t => t.id),
                                }}
                                allTasks={filteredTasks}
                                onTaskPress={(task) => { navigate(`/task/${task.id}`) }}
                            />
                        );
                    })}
                </div>
                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} onPress={() => {}} /> : null}
                </DragOverlay>
            </DndContext>


            <button
                className="fixed bottom-8 right-8 bg-blue-500 text-white text-3xl w-14 h-14 rounded-full flex items-center justify-center shadow-md z-10"
                onClick={() => setModalVisible(true)}
            >
                <span aria-hidden="true">+</span>
            </button>

            <TaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={(newTask) => {
                    setTasks([...tasks, newTask]);
                    setModalVisible(false);
                }}
            />
        </>
    );
}
