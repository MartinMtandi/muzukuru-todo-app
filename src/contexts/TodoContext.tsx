/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { todoApi } from '../services/todoApi';

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
  loading: boolean;
  error: string | null;
}

type TodoAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO_START' }
  | { type: 'ADD_TODO_SUCCESS'; payload: Todo }
  | { type: 'ADD_TODO_ERROR'; payload: string }
  | { type: 'UPDATE_TODO_START'; payload: string }
  | { type: 'UPDATE_TODO_SUCCESS'; payload: Todo }
  | { type: 'UPDATE_TODO_ERROR'; payload: string }
  | { type: 'DELETE_TODO_START'; payload: string }
  | { type: 'DELETE_TODO_SUCCESS'; payload: string }
  | { type: 'DELETE_TODO_ERROR'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'CLEAR_COMPLETED_START' }
  | { type: 'CLEAR_COMPLETED_SUCCESS' }
  | { type: 'CLEAR_COMPLETED_ERROR'; payload: string };

interface TodoContextType {
  state: TodoState;
  filteredTodos: Todo[];
  addTodo: (text: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_TODOS':
      return { ...state, todos: action.payload, loading: false };
    
    case 'ADD_TODO_START':
      return { ...state, loading: true, error: null };
    
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false,
        error: null,
      };
    
    case 'ADD_TODO_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    case 'UPDATE_TODO_START':
      return { ...state, loading: true, error: null };
    
    case 'UPDATE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        loading: false,
        error: null,
      };
    
    case 'UPDATE_TODO_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    case 'DELETE_TODO_START':
      return { ...state, loading: true, error: null };
    
    case 'DELETE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        loading: false,
        error: null,
      };
    
    case 'DELETE_TODO_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
    case 'CLEAR_COMPLETED_START':
      return { ...state, loading: true, error: null };
    
    case 'CLEAR_COMPLETED_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
        loading: false,
        error: null,
      };
    
    case 'CLEAR_COMPLETED_ERROR':
      return { ...state, loading: false, error: action.payload };
    
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
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    loading: false,
    error: null,
  });

  // Load todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const todos = await todoApi.getTodos();
        dispatch({ type: 'SET_TODOS', payload: todos });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load todos' });
      }
    };
    loadTodos();
  }, []);

  const filteredTodos = getFilteredTodos(state.todos, state.filter);

  const addTodo = async (text: string) => {
    try {
      dispatch({ type: 'ADD_TODO_START' });
      const newTodo = await todoApi.createTodo(text);
      dispatch({ type: 'ADD_TODO_SUCCESS', payload: newTodo });
    } catch (error) {
      dispatch({ type: 'ADD_TODO_ERROR', payload: 'Failed to add todo' });
    }
  };

  const updateTodo = async (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    try {
      dispatch({ type: 'UPDATE_TODO_START', payload: id });
      const updatedTodo = await todoApi.updateTodo(id, updates);
      dispatch({ type: 'UPDATE_TODO_SUCCESS', payload: updatedTodo });
    } catch (error) {
      dispatch({ type: 'UPDATE_TODO_ERROR', payload: 'Failed to update todo' });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      dispatch({ type: 'DELETE_TODO_START', payload: id });
      await todoApi.deleteTodo(id);
      dispatch({ type: 'DELETE_TODO_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_TODO_ERROR', payload: 'Failed to delete todo' });
    }
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const clearCompleted = async () => {
    try {
      dispatch({ type: 'CLEAR_COMPLETED_START' });
      await todoApi.clearCompleted();
      dispatch({ type: 'CLEAR_COMPLETED_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'CLEAR_COMPLETED_ERROR', payload: 'Failed to clear completed todos' });
    }
  };

  return (
    <TodoContext.Provider value={{ 
      state, 
      filteredTodos, 
      addTodo, 
      updateTodo, 
      deleteTodo, 
      setFilter, 
      clearCompleted 
    }}>
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