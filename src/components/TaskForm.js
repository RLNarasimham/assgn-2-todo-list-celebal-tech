import React, { useState } from 'react';
import styles from '../styles/styles';

function TaskForm({ onAddTask }) {
    const [taskText, setTaskText] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newText = taskText.trim();
        if (!newText) {
            alert('Task cannot be empty');
            return;
        }
        onAddTask(newText);
        setTaskText('');
    };

    return (
        <form onSubmit={handleFormSubmit} style={styles.form}>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter a new task"
                style={styles.input}
            />
            <button type="submit" style={styles.addButton}>
                Add
            </button>
        </form>
    );
}

export default TaskForm;
