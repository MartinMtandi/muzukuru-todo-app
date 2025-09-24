import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodo, Todo } from '../contexts/TodoContext';
import { Check, Edit3, Trash2, X, Save } from 'lucide-react';

const ItemContainer = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: hsl(var(--card));
  border: 2px solid hsl(var(--border));
  border-radius: var(--radius);
  transition: var(--transition-all);
  opacity: ${props => props.$completed ? 0.7 : 1};
  
  &:hover {
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckboxButton = styled.button<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid ${props => props.$completed ? 'hsl(var(--primary))' : 'hsl(var(--border))'};
  border-radius: calc(var(--radius) - 4px);
  background: ${props => props.$completed ? 'var(--gradient-primary)' : 'transparent'};
  color: hsl(var(--primary-foreground));
  cursor: pointer;
  transition: var(--transition-all);
  flex-shrink: 0;
  
  &:hover {
    border-color: hsl(var(--primary));
    ${props => !props.$completed && `
      background: hsl(var(--primary) / 0.1);
    `}
  }
`;

const TodoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TodoText = styled.span<{ $completed: boolean }>`
  font-size: 1rem;
  line-height: 1.5;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  color: ${props => props.$completed ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'};
  word-wrap: break-word;
  display: block;
`;

const TodoMeta = styled.div`
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  margin-top: 0.25rem;
  opacity: 0.8;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 2px solid hsl(var(--primary));
  border-radius: calc(var(--radius) - 4px);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0.7;
  transition: var(--transition-all);
  
  ${ItemContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button<{ $variant?: 'danger' | 'success' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: calc(var(--radius) - 4px);
  background: ${props => {
    if (props.$variant === 'danger') return 'hsl(var(--destructive))';
    if (props.$variant === 'success') return 'hsl(var(--primary))';
    return 'hsl(var(--muted))';
  }};
  color: ${props => 
    props.$variant === 'danger' ? 'hsl(var(--destructive-foreground))' :
    props.$variant === 'success' ? 'hsl(var(--primary-foreground))' :
    'hsl(var(--muted-foreground))'
  };
  cursor: pointer;
  transition: var(--transition-all);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-sm);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = async () => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = async () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      await updateTodo(todo.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <ItemContainer $completed={todo.completed}>
      <CheckboxButton $completed={todo.completed} onClick={handleToggle}>
        {todo.completed && <Check size={12} />}
      </CheckboxButton>
      
      {isEditing ? (
        <>
          <EditInput
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={200}
          />
          <ActionButtons>
            <ActionButton $variant="success" onClick={handleSave} title="Save">
              <Save size={14} />
            </ActionButton>
            <ActionButton onClick={handleCancel} title="Cancel">
              <X size={14} />
            </ActionButton>
          </ActionButtons>
        </>
      ) : (
        <>
          <TodoContent>
            <TodoText $completed={todo.completed}>{todo.text}</TodoText>
            <TodoMeta>
              Created {formatDate(todo.createdAt)}
              {todo.updatedAt > todo.createdAt && ` • Updated ${formatDate(todo.updatedAt)}`}
            </TodoMeta>
          </TodoContent>
          <ActionButtons>
            <ActionButton onClick={handleEdit} title="Edit">
              <Edit3 size={14} />
            </ActionButton>
            <ActionButton $variant="danger" onClick={handleDelete} title="Delete">
              <Trash2 size={14} />
            </ActionButton>
          </ActionButtons>
        </>
      )}
    </ItemContainer>
  );
};

export default TodoItem;