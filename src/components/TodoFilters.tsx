import React from 'react';
import styled from 'styled-components';
import { useTodo, FilterType } from '../contexts/TodoContext';

const FiltersContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$active ? 'hsl(var(--primary))' : 'hsl(var(--border))'};
  border-radius: calc(var(--radius) - 2px);
  background: ${props => props.$active ? 'var(--gradient-primary)' : 'hsl(var(--background))'};
  color: ${props => props.$active ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-all);
  
  &:hover {
    border-color: hsl(var(--primary));
    ${props => !props.$active && `
      background: hsl(var(--primary) / 0.05);
    `}
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

const TodoFilters: React.FC = () => {
  const { state, dispatch } = useTodo();

  const handleFilterChange = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <FiltersContainer>
      {filters.map(({ key, label }) => (
        <FilterButton
          key={key}
          $active={state.filter === key}
          onClick={() => handleFilterChange(key)}
        >
          {label}
        </FilterButton>
      ))}
    </FiltersContainer>
  );
};

export default TodoFilters;