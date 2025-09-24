import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  
  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: hsl(var(--muted-foreground));
  font-size: 1.125rem;
  font-weight: 400;
`;

const TodoHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>TodoList</Title>
      <Subtitle>Organize your tasks with style and efficiency</Subtitle>
    </HeaderContainer>
  );
};

export default TodoHeader;