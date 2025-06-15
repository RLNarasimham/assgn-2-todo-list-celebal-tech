import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    cleanup,
    within
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoList from './ToDoList';

describe('ToDoList Component', () => {
    let dateNowSpy;

    beforeEach(() => {
        localStorage.clear();

        let current = 1000;
        dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => {
            current += 1000;
            return current;
        });

        jest.spyOn(window, 'confirm').mockImplementation(() => true);

        jest.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        cleanup();
    });

    test('loads initial tasks from localStorage on mount', () => {
        const initialTasks = [
            {
                id: 1,
                text: 'Stored Task',
                completed: false,
                createdAt: new Date(2020, 1, 1).toISOString(),
            },
        ];
        localStorage.setItem('react-todo-list-tasks', JSON.stringify(initialTasks));

        render(<ToDoList />);

        expect(screen.getByText('Stored Task')).toBeInTheDocument();
    });

    test('shows "No tasks to display" when there are no tasks', () => {
        render(<ToDoList />);
        expect(screen.getByText(/no tasks to display/i)).toBeInTheDocument();
    });

    test('adds a new task and updates localStorage', async () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New Task' } });
        expect(input.value).toBe('New Task');
        fireEvent.click(addButton);

        const taskSpan = await screen.findByText('New Task');
        expect(taskSpan).toBeInTheDocument();

        expect(input.value).toBe('');

        const stored = JSON.parse(localStorage.getItem('react-todo-list-tasks'));
        expect(Array.isArray(stored)).toBe(true);
        expect(stored.length).toBe(1);
        expect(stored[0].text).toBe('New Task');
        expect(stored[0].completed).toBe(false);
    });

    test('shows alert and does not add when submitting empty task', () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        expect(input.value).toBe('');

        fireEvent.click(addButton);

        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith('Task cannot be empty');

        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
        const stored = JSON.parse(localStorage.getItem('react-todo-list-tasks'));
        expect(stored).toEqual([]);
    });

    test('toggles task completion and style updates', async () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        fireEvent.change(input, { target: { value: 'Toggle Me' } });
        fireEvent.click(addButton);

        const checkbox = await screen.findByRole('checkbox');
        const textSpan = screen.getByText('Toggle Me');

        expect(checkbox).not.toBeChecked();
        expect(textSpan).not.toHaveStyle('text-decoration: line-through');

        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        expect(textSpan).toHaveStyle('text-decoration: line-through');

        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(textSpan).not.toHaveStyle('text-decoration: line-through');
    });

    test('deletes a task when Delete is clicked', async () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        fireEvent.change(input, { target: { value: 'Delete Me' } });
        fireEvent.click(addButton);

        const taskSpan = await screen.findByText('Delete Me');
        expect(taskSpan).toBeInTheDocument();

        const deleteBtn = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteBtn);

        await waitFor(() => {
            expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
        });

        const stored = JSON.parse(localStorage.getItem('react-todo-list-tasks'));
        expect(stored).toEqual([]);
    });

    test('filters tasks correctly (All, Pending, Completed)', async () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        const filterSelect = screen.getByLabelText(/Filter:/i);

        fireEvent.change(input, { target: { value: 'First Task' } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: 'Second Task' } });
        fireEvent.click(addButton);

        const checkboxes = await screen.findAllByRole('checkbox');

        const firstCheckbox = checkboxes.find((cb) => {
            const listItem = screen.getByRole('listitem', { name: cb.textContent ?? '' });
            if (!listItem) throw new Error('Could not find task container');
            const span = within(listItem).getByText('First Task');
            return span && span.textContent === 'First Task';
        });
        fireEvent.click(firstCheckbox);

        fireEvent.change(filterSelect, { target: { value: 'pending' } });
        expect(screen.getByText('Second Task')).toBeInTheDocument();
        expect(screen.queryByText('First Task')).not.toBeInTheDocument();

        fireEvent.change(filterSelect, { target: { value: 'completed' } });
        expect(screen.getByText('First Task')).toBeInTheDocument();
        expect(screen.queryByText('Second Task')).not.toBeInTheDocument();

        fireEvent.change(filterSelect, { target: { value: 'all' } });
        expect(screen.getByText('First Task')).toBeInTheDocument();
        expect(screen.getByText('Second Task')).toBeInTheDocument();
    });

    test('sorts tasks correctly (Newest, Oldest, A-Z, Z-A)', async () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        const sortSelect = screen.getByLabelText(/Sort:/i);

        fireEvent.change(input, { target: { value: 'B Task' } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: 'A Task' } });
        fireEvent.click(addButton);

        let items = await screen.findAllByRole('listitem');
        expect(items[0]).toHaveTextContent('A Task');
        expect(items[1]).toHaveTextContent('B Task');

        fireEvent.change(sortSelect, { target: { value: 'oldest' } });
        items = screen.getAllByRole('listitem');
        expect(items[0]).toHaveTextContent('B Task');
        expect(items[1]).toHaveTextContent('A Task');

        fireEvent.change(sortSelect, { target: { value: 'alpha-asc' } });
        items = screen.getAllByRole('listitem');
        expect(items[0]).toHaveTextContent('A Task');
        expect(items[1]).toHaveTextContent('B Task');

        fireEvent.change(sortSelect, { target: { value: 'alpha-desc' } });
        items = screen.getAllByRole('listitem');
        expect(items[0]).toHaveTextContent('B Task');
        expect(items[1]).toHaveTextContent('A Task');
    });

    test('edits a task text correctly and persists change', async () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        fireEvent.change(input, { target: { value: 'Editable Task' } });
        fireEvent.click(addButton);

        const editBtn = await screen.findByRole('button', { name: /edit/i });
        fireEvent.click(editBtn);

        const editInput = screen.getByDisplayValue('Editable Task');
        expect(editInput).toBeInTheDocument();

        fireEvent.change(editInput, { target: { value: 'Updated Task' } });
        const saveBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveBtn);

        const updatedSpan = await screen.findByText('Updated Task');
        expect(updatedSpan).toBeInTheDocument();

        const stored = JSON.parse(localStorage.getItem('react-todo-list-tasks'));
        expect(stored.some((t) => t.text === 'Updated Task')).toBe(true);
    });

    test('cancelling edit does not change the task text', async () => {
        render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        fireEvent.change(input, { target: { value: 'Task To Cancel' } });
        fireEvent.click(addButton);

        const editBtn = await screen.findByRole('button', { name: /edit/i });
        fireEvent.click(editBtn);

        const editInput = screen.getByDisplayValue('Task To Cancel');
        fireEvent.change(editInput, { target: { value: 'Should Not Save' } });

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn);

        expect(screen.getByText('Task To Cancel')).toBeInTheDocument();

        const stored = JSON.parse(localStorage.getItem('react-todo-list-tasks'));
        expect(stored.some((t) => t.text === 'Task To Cancel')).toBe(true);
        expect(stored.some((t) => t.text === 'Should Not Save')).toBe(false);
    });

    test('persists tasks across remount via localStorage', async () => {
        const { unmount } = render(<ToDoList />);

        const input = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        fireEvent.change(input, { target: { value: 'Persistent Task' } });
        fireEvent.click(addButton);

        expect(await screen.findByText('Persistent Task')).toBeInTheDocument();

        unmount();
        render(<ToDoList />);

        expect(await screen.findByText('Persistent Task')).toBeInTheDocument();
    });
});
