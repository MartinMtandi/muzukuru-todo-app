import React from 'react';
import styled from 'styled-components';
import { useTodo } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

const ListContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: hsl(var(--muted-foreground));
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  font-size: 0.875rem;
  opacity: 0.7;
`;

const TodoList: React.FC = () => {
  const { filteredTodos, state } = useTodo();

  if (filteredTodos.length === 0) {
    const getEmptyMessage = () => {
      switch (state.filter) {
        case 'active':
          return {
            icon: '🎉',
            text: 'No active tasks!',
            subtext: 'All your tasks are completed. Great job!'
          };
        case 'completed':
          return {
            icon: '📝',
            text: 'No completed tasks yet',
            subtext: 'Complete some tasks to see them here'
          };
        default:
          return {
            icon: '✨',
            text: 'No tasks yet',
            subtext: 'Add your first task to get started'
          };
      }
    };

    const emptyMessage = getEmptyMessage();

    return (
      <ListContainer>
        <EmptyState>
          <EmptyIcon>{emptyMessage.icon}</EmptyIcon>
          <EmptyText>{emptyMessage.text}</EmptyText>
          <EmptySubtext>{emptyMessage.subtext}</EmptySubtext>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ListContainer>
  );
};

export default TodoList;