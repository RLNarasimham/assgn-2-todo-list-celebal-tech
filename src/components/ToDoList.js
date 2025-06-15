import React, { useState } from 'react';
import TaskForm from './TaskForm';
import FilterSortControls from './FilterSortControls';
import TaskItem from './TaskItem';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from '../styles/styles';

function ToDoList() {
    const [taskList, setTaskList] = useLocalStorage('react-todo-list-tasks', []);
    const [filterType, setFilterType] = useState('all');
    const [sortType, setSortType] = useState('newest');

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTaskList([newTask, ...taskList]);
    };

    const deleteTask = (id) => {
        if (window.confirm('Delete this task?')) {
            setTaskList(taskList.filter((item) => item.id !== id));
        }
    };

    const toggleComplete = (id) => {
        setTaskList(
            taskList.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const updateTaskText = (id, newText) => {
        setTaskList(
            taskList.map((item) =>
                item.id === id ? { ...item, text: newText } : item
            )
        );
    };

    const filteredList = taskList.filter((item) => {
        if (filterType === 'completed') return item.completed;
        if (filterType === 'pending') return !item.completed;
        return true;
    });

    const sortedList = [...filteredList].sort((a, b) => {
        switch (sortType) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'alpha-asc':
                return a.text.localeCompare(b.text);
            case 'alpha-desc':
                return b.text.localeCompare(a.text);
            default:
                return 0;
        }
    });

    return (
        <div style={styles.container}>
            <h2>To-Do List</h2>
            <TaskForm onAddTask={addTask} />
            <FilterSortControls
                filterType={filterType}
                setFilterType={setFilterType}
                sortType={sortType}
                setSortType={setSortType}
            />
            <ul style={styles.list}>
                {sortedList.map((item) => (
                    <TaskItem
                        key={item.id}
                        item={item}
                        onToggle={toggleComplete}
                        onDelete={deleteTask}
                        onEdit={updateTaskText}
                    />
                ))}
            </ul>
            {sortedList.length === 0 && <p>No tasks to display</p>}
        </div>
    );
}

export default ToDoList;
