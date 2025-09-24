import React from 'react';
import styled from 'styled-components';
import { useTodo } from '../contexts/TodoContext';

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid hsl(var(--border));
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StatsText = styled.div`
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 4px);
  background: hsl(var(--background));
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition-all);
  
  &:hover {
    border-color: hsl(var(--destructive));
    color: hsl(var(--destructive));
    background: hsl(var(--destructive) / 0.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:disabled:hover {
    border-color: hsl(var(--border));
    color: hsl(var(--muted-foreground));
    background: hsl(var(--background));
  }
`;

const TodoStats: React.FC = () => {
  const { state, dispatch } = useTodo();
  
  const totalTodos = state.todos.length;
  const completedTodos = state.todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  if (totalTodos === 0) {
    return null;
  }

  return (
    <StatsContainer>
      <StatsText>
        {activeTodos === 0 ? (
          "All tasks completed!"
        ) : (
          `${activeTodos} ${activeTodos === 1 ? 'task' : 'tasks'} remaining`
        )}
        {totalTodos > 0 && ` • ${completedTodos}/${totalTodos} completed`}
      </StatsText>
      
      {completedTodos > 0 && (
        <ClearButton onClick={handleClearCompleted}>
          Clear completed ({completedTodos})
        </ClearButton>
      )}
    </StatsContainer>
  );
};

export default TodoStats;