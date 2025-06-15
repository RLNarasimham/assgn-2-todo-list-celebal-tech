import { useMemo } from 'react';

export function useFilteredSortedTasks(taskList, filterType, sortType) {
    const filteredList = useMemo(() => {
        return taskList.filter((item) => {
            if (filterType === 'completed') return item.completed;
            if (filterType === 'pending') return !item.completed;
            return true;
        });
    }, [taskList, filterType]);

    const finalTaskList = useMemo(() => {
        return [...filteredList].sort((a, b) => {
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
    }, [filteredList, sortType]);

    return finalTaskList;
}
