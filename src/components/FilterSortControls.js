import React from 'react';
import styles from '../styles/styles';
import { useState } from 'react';

function FilterSortControls({ filterType, setFilterType, sortType, setSortType }) {
    const [isHoveringFilter, setIsHoveringFilter] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const selectSortStyle = {
        ...styles.sortSelect,
        ...(isHovering ? styles.sortSelectHover : {}),
    };

    const selectStyle = {
        ...styles.filterSelect,
        ...(isHoveringFilter ? styles.filterSelectHover : {}),
    };
    return (
        <div style={styles.controls}>
            <div>
                <label>Filter: </label>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={selectStyle}
                    onMouseEnter={() => setIsHoveringFilter(true)}
                    onMouseLeave={() => setIsHoveringFilter(false)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label>Sort: </label>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    style={selectSortStyle}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alpha-asc">A - Z</option>
                    <option value="alpha-desc">Z - A</option>
                </select>
            </div>
        </div>
    );
}

export default FilterSortControls;
