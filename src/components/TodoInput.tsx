import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodo } from '../contexts/TodoContext';
import { Plus } from 'lucide-react';

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.25rem;
  border: 2px solid hsl(var(--border));
  border-radius: var(--radius);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 1rem;
  transition: var(--transition-all);
  
  &:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
  }
  
  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius);
  color: hsl(var(--primary-foreground));
  cursor: pointer;
  transition: var(--transition-transform);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const TodoInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo, state } = useTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            maxLength={200}
          />
          <AddButton 
            type="submit" 
            disabled={!inputValue.trim() || state.loading}
            title="Add todo"
          >
            <Plus size={20} />
          </AddButton>
        </InputWrapper>
      </form>
    </InputContainer>
  );
};

export default TodoInput;