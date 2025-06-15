import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSortControls from './FilterSortControls';

const FILTER_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
];
const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alpha-asc', label: 'A - Z' },
    { value: 'alpha-desc', label: 'Z - A' },
];

describe('FilterSortControls component', () => {
    test('renders filter and sort selects with correct initial values', () => {
        const mockSetFilterType = jest.fn();
        const mockSetSortType = jest.fn();

        render(
            <FilterSortControls
                filterType="all"
                setFilterType={mockSetFilterType}
                sortType="newest"
                setSortType={mockSetSortType}
            />
        );

        const filterSelect = screen.getByLabelText(/Filter:/i);
        expect(filterSelect).toBeInTheDocument();
        expect(filterSelect).toHaveValue('all');

        FILTER_OPTIONS.forEach(({ value, label }) => {
            const option = screen.getByRole('option', { name: label });
            expect(option).toBeInTheDocument();
            expect(option).toHaveValue(value);
        });

        const sortSelect = screen.getByLabelText(/Sort:/i);
        expect(sortSelect).toBeInTheDocument();
        
        expect(sortSelect).toHaveValue('newest');

        SORT_OPTIONS.forEach(({ value, label }) => {
            const option = screen.getByRole('option', { name: label });
            expect(option).toBeInTheDocument();
            expect(option).toHaveValue(value);
        });
    });

    test('calls setFilterType when filter selection changes', () => {
        const mockSetFilterType = jest.fn();
        const mockSetSortType = jest.fn();

        render(
            <FilterSortControls
                filterType="all"
                setFilterType={mockSetFilterType}
                sortType="newest"
                setSortType={mockSetSortType}
            />
        );

        const filterSelect = screen.getByLabelText(/Filter:/i);

        fireEvent.change(filterSelect, { target: { value: 'pending' } });
        expect(mockSetFilterType).toHaveBeenCalledTimes(1);
        expect(mockSetFilterType).toHaveBeenCalledWith('pending');

        fireEvent.change(filterSelect, { target: { value: 'completed' } });
        expect(mockSetFilterType).toHaveBeenCalledTimes(2);
        expect(mockSetFilterType).toHaveBeenCalledWith('completed');
    });

    test('calls setSortType when sort selection changes', () => {
        const mockSetFilterType = jest.fn();
        const mockSetSortType = jest.fn();

        render(
            <FilterSortControls
                filterType="all"
                setFilterType={mockSetFilterType}
                sortType="newest"
                setSortType={mockSetSortType}
            />
        );

        const sortSelect = screen.getByLabelText(/Sort:/i);

        fireEvent.change(sortSelect, { target: { value: 'oldest' } });
        expect(mockSetSortType).toHaveBeenCalledTimes(1);
        expect(mockSetSortType).toHaveBeenCalledWith('oldest');

        fireEvent.change(sortSelect, { target: { value: 'alpha-asc' } });
        expect(mockSetSortType).toHaveBeenCalledTimes(2);
        expect(mockSetSortType).toHaveBeenCalledWith('alpha-asc');

        fireEvent.change(sortSelect, { target: { value: 'alpha-desc' } });
        expect(mockSetSortType).toHaveBeenCalledTimes(3);
        expect(mockSetSortType).toHaveBeenCalledWith('alpha-desc');
    });

    test('renders correctly with non-default values', () => {
        const mockSetFilterType = jest.fn();
        const mockSetSortType = jest.fn();

        render(
            <FilterSortControls
                filterType="pending"
                setFilterType={mockSetFilterType}
                sortType="alpha-desc"
                setSortType={mockSetSortType}
            />
        );

        const filterSelect = screen.getByLabelText(/Filter:/i);
        expect(filterSelect).toHaveValue('pending');

        const sortSelect = screen.getByLabelText(/Sort:/i);
        expect(sortSelect).toHaveValue('alpha-desc');
    });
});
