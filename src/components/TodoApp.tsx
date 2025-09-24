import React from 'react';
import styled from 'styled-components';
import { TodoProvider } from '../contexts/TodoContext';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import TodoStats from './TodoStats';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--gradient-background);
`;

const TodoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
`;

const MainCard = styled.div`
  background: hsl(var(--card));
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid hsl(var(--border));
  backdrop-filter: blur(16px);
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 0.5rem;
  }
`;

const TodoApp: React.FC = () => {
  return (
    <TodoProvider>
      <AppContainer>
        <TodoHeader />
        <TodoContainer>
          <MainCard>
            <TodoInput />
            <TodoFilters />
            <TodoList />
            <TodoStats />
          </MainCard>
        </TodoContainer>
      </AppContainer>
    </TodoProvider>
  );
};

export default TodoApp;