import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from './TaskItem';

describe('TaskItem component', () => {
    const sampleItem = {
        id: '1',
        text: 'Sample task',
        completed: false,
        createdAt: new Date().toISOString(),
    };

    test('renders checkbox unchecked, text, Edit and Delete buttons in view mode', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();

        const textSpan = screen.getByText(sampleItem.text);
        expect(textSpan).toBeInTheDocument();

        expect(textSpan).not.toHaveStyle('text-decoration: line-through');

        const editBtn = screen.getByRole('button', { name: /edit/i });
        expect(editBtn).toBeInTheDocument();

        const deleteBtn = screen.getByRole('button', { name: /delete/i });
        expect(deleteBtn).toBeInTheDocument();
    });

    test('checkbox toggles and calls onToggle with item id', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(mockToggle).toHaveBeenCalledTimes(1);
        expect(mockToggle).toHaveBeenCalledWith(sampleItem.id);
    });

    test('Delete button calls onDelete with item id', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const deleteBtn = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteBtn);
        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(sampleItem.id);
    });

    test('renders completed task with line-through style', () => {
        const completedItem = { ...sampleItem, completed: true };
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={completedItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();

        const textSpan = screen.getByText(completedItem.text);
        expect(textSpan).toHaveStyle('text-decoration: line-through');
    });

    test('entering edit mode shows input with current text, Save and Cancel buttons', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        expect(screen.queryByDisplayValue(sampleItem.text)).not.toBeInTheDocument();

        const editBtn = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editBtn);

        const input = screen.getByDisplayValue(sampleItem.text);
        expect(input).toBeInTheDocument();

        const saveBtn = screen.getByRole('button', { name: /save/i });
        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        expect(saveBtn).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();
    });

    test('editing text and clicking Save calls onEdit and exits edit mode', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const editBtn = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editBtn);

        const input = screen.getByDisplayValue(sampleItem.text);
        fireEvent.change(input, { target: { value: 'Updated task text' } });
        expect(input.value).toBe('Updated task text');

        const saveBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveBtn);

        expect(mockEdit).toHaveBeenCalledTimes(1);
        expect(mockEdit).toHaveBeenCalledWith(sampleItem.id, 'Updated task text');

        expect(screen.queryByDisplayValue('Updated task text')).not.toBeInTheDocument();

        const textSpan = screen.getByText(sampleItem.text);
        expect(textSpan).toBeInTheDocument();
    });

    test('editing text and clicking Cancel discards changes and exits edit mode', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const editBtn = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editBtn);

        const input = screen.getByDisplayValue(sampleItem.text);

        fireEvent.change(input, { target: { value: 'Discarded text' } });
        expect(input.value).toBe('Discarded text');


        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn);

        expect(mockEdit).not.toHaveBeenCalled();

        expect(screen.queryByDisplayValue('Discarded text')).not.toBeInTheDocument();
        const textSpan = screen.getByText(sampleItem.text);
        expect(textSpan).toBeInTheDocument();
    });

    test('pressing Enter in edit input triggers Save', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const editBtn = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editBtn);

        const input = screen.getByDisplayValue(sampleItem.text);

        fireEvent.change(input, { target: { value: 'Enter save text' } });

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(mockEdit).toHaveBeenCalledTimes(1);
        expect(mockEdit).toHaveBeenCalledWith(sampleItem.id, 'Enter save text');
    });

    test('pressing Escape in edit input triggers Cancel', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(
            <TaskItem
                item={sampleItem}
                onToggle={mockToggle}
                onDelete={mockDelete}
                onEdit={mockEdit}
            />
        );

        const editBtn = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editBtn);

        const input = screen.getByDisplayValue(sampleItem.text);

        fireEvent.change(input, { target: { value: 'Some text' } });

        fireEvent.keyDown(input, { key: 'Escape', code: 'Escape', charCode: 27 });

        expect(mockEdit).not.toHaveBeenCalled();
        
        expect(screen.queryByDisplayValue('Some text')).not.toBeInTheDocument();
        const textSpan = screen.getByText(sampleItem.text);
        expect(textSpan).toBeInTheDocument();
    });
});
