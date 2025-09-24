/* eslint react-refresh/only-export-components: ["warn", {"allowExportNames": ["useTodo"]}] */
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

type TodoAction = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'CLEAR_COMPLETED' };

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  filteredTodos: Todo[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Mock data
const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Design the user interface for the todo app',
    completed: false,
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
  },
  {
    id: '2', 
    text: 'Implement CRUD operations with Context API',
    completed: true,
    createdAt: new Date('2024-01-14T09:30:00'),
    updatedAt: new Date('2024-01-14T14:22:00'),
  },
  {
    id: '3',
    text: 'Add smooth animations and modern styling',
    completed: false,
    createdAt: new Date('2024-01-16T08:15:00'),
    updatedAt: new Date('2024-01-16T08:15:00'),
  },
  {
    id: '4',
    text: 'Test the application thoroughly',
    completed: false,
    createdAt: new Date('2024-01-17T11:45:00'),
    updatedAt: new Date('2024-01-17T11:45:00'),
  },
];

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        todos: [newTodo, ...state.todos],
      };
    }
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        ),
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, updatedAt: new Date() }
            : todo
        ),
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    
    default:
      return state;
  }
};

const getFilteredTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: TodoState = {
    todos: mockTodos,
    filter: 'all',
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const filteredTodos = getFilteredTodos(state.todos, state.filter);

  return (
    <TodoContext.Provider value={{ state, dispatch, filteredTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};