import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm component', () => {
    let alertMock;

    beforeEach(() => {
        alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        alertMock.mockRestore();
    });

    test('renders input and Add button', () => {
        const mockAdd = jest.fn();
        render(<TaskForm onAddTask={mockAdd} />);

        const inputEl = screen.getByPlaceholderText(/enter a new task/i);
        expect(inputEl).toBeInTheDocument();

        const addButton = screen.getByRole('button', { name: /add/i });
        expect(addButton).toBeInTheDocument();
    });

    test('calls onAddTask with trimmed text and clears input on valid submission via click', () => {
        const mockAdd = jest.fn();
        render(<TaskForm onAddTask={mockAdd} />);

        const inputEl = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(inputEl, { target: { value: '  my new task  ' } });
        expect(inputEl.value).toBe('  my new task  ');

        fireEvent.click(addButton);

        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(mockAdd).toHaveBeenCalledWith('my new task');

        expect(inputEl.value).toBe('');
        expect(alertMock).not.toHaveBeenCalled();
    });

    test('calls onAddTask with trimmed text and clears input on valid submission via Enter key', () => {
        const mockAdd = jest.fn();
        render(<TaskForm onAddTask={mockAdd} />);

        const inputEl = screen.getByPlaceholderText(/enter a new task/i);

        fireEvent.change(inputEl, { target: { value: 'task via enter' } });
        expect(inputEl.value).toBe('task via enter');

        fireEvent.keyDown(inputEl, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(mockAdd).toHaveBeenCalledWith('task via enter');

        expect(inputEl.value).toBe('');
        expect(alertMock).not.toHaveBeenCalled();
    });

    test('shows alert and does not call onAddTask when submitting empty input via click', () => {
        const mockAdd = jest.fn();
        render(<TaskForm onAddTask={mockAdd} />);

        const inputEl = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        expect(inputEl.value).toBe('');

        fireEvent.click(addButton);

        expect(mockAdd).not.toHaveBeenCalled();

        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(alertMock).toHaveBeenCalledWith('Task cannot be empty');

        expect(inputEl.value).toBe('');
    });

    test('shows alert and does not call onAddTask when submitting whitespace-only input', () => {
        const mockAdd = jest.fn();
        render(<TaskForm onAddTask={mockAdd} />);

        const inputEl = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(inputEl, { target: { value: '    ' } });
        expect(inputEl.value).toBe('    ');

        fireEvent.click(addButton);

        expect(mockAdd).not.toHaveBeenCalled();

        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(alertMock).toHaveBeenCalledWith('Task cannot be empty');

        expect(inputEl.value).toBe('    ');
    });

    test('clears alert state after user types again', () => {
        const mockAdd = jest.fn();
        render(<TaskForm onAddTask={mockAdd} />);

        const inputEl = screen.getByPlaceholderText(/enter a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.click(addButton);
        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(mockAdd).not.toHaveBeenCalled();

        fireEvent.change(inputEl, { target: { value: 'valid task' } });
        expect(alertMock).toHaveBeenCalledTimes(1);

        fireEvent.click(addButton);
        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(mockAdd).toHaveBeenCalledWith('valid task');
        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(inputEl.value).toBe('');
    });
});
