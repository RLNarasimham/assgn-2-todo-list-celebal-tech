const TASKS_KEY = 'react-todo-list-tasks';

export const loadTasks = () => {
    try {
        const json = localStorage.getItem(TASKS_KEY);
        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.warn('Could not load tasks from localStorage:', error);
        return [];
    }
};

export const saveTasks = (tasksList) => {
    try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasksList));
    } catch (error) {
        console.warn('Could not save tasks to localStorage:', error);
    }
};
