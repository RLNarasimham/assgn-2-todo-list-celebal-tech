import React, { useState } from 'react';
import styles from '../styles/styles';

function TaskItem({ item, onToggle, onDelete, onEdit }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editText, setEditText] = useState(item.text);
    const [isHoveringEdit, setIsHoveringEdit] = useState(false);
    const [isHoveringDelete, setIsHoveringDelete] = useState(false);

    const deleteBtnStyle = {
        ...styles.deleteButton,
        ...(isHoveringDelete ? styles.deleteButtonHover : {}),
    };

    const editButtonStyle = {
        ...styles.addButton,
        ...(isHoveringEdit ? styles.addButtonHover : {}),
    };

    const saveChanges = () => {
        const trimmedText = editText.trim();
        if (trimmedText) {
            onEdit(item.id, trimmedText);
            setIsEditMode(false);
        } else {
            alert('Task text cannot be empty.');
        }
    };

    const cancelEdit = () => {
        setEditText(item.text);
        setIsEditMode(false);
    };

    return (
        <li style={styles.listItem}>
            <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggle(item.id)}
            />
            {isEditMode ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveChanges()}
                        style={styles.input}
                    />
                    <button onClick={saveChanges} style={styles.addButton}>
                        Save
                    </button>
                    <button onClick={cancelEdit} style={styles.deleteButton}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <span
                        style={{
                            ...styles.taskText,
                            textDecoration: item.completed ? 'line-through' : 'none',
                            color: item.completed ? '#888' : '#000',
                        }}
                    >
                        {item.text}
                    </span>
                    <button
                        onClick={() => setIsEditMode(true)}
                        style={editButtonStyle}
                        onMouseEnter={() => setIsHoveringEdit(true)}
                        onMouseLeave={() => setIsHoveringEdit(false)}
                    >
                        Edit
                    </button>
                    <button
                        style={deleteBtnStyle}
                        onMouseEnter={() => setIsHoveringDelete(true)}
                        onMouseLeave={() => setIsHoveringDelete(false)}
                        onClick={() => onDelete(item.id)}
                    >
                        Delete
                    </button>
                </>
            )}
        </li>
    );
}

export default TaskItem;
