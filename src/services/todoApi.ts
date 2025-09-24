import { Todo, FilterType } from '../contexts/TodoContext';

const STORAGE_KEY = 'todos_app_data';
const API_DELAY = 800; // Simulate network latency

// Initial mock data
const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'Design the user interface for the todo app',
    completed: false,
    createdAt: new Date('2025-09-24T10:00:00'),
    updatedAt: new Date('2025-09-24T10:00:00'),
  },
  {
    id: '2', 
    text: 'Implement CRUD operations with Context API',
    completed: true,
    createdAt: new Date('2025-09-24T09:30:00'),
    updatedAt: new Date('2025-09-24T14:22:00'),
  },
  {
    id: '3',
    text: 'Add smooth animations and modern styling',
    completed: false,
    createdAt: new Date('2025-09-24T08:15:00'),
    updatedAt: new Date('2025-09-24T08:15:00'),
  },
  {
    id: '4',
    text: 'Test the application thoroughly',
    completed: false,
    createdAt: new Date('2025-09-24T11:45:00'),
    updatedAt: new Date('2025-09-24T11:45:00'),
  },
];

// Utility functions for localStorage
const getStoredTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((todo: Todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    }
    return initialTodos;
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return initialTodos;
  }
};

const storeTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated API methods
export const todoApi = {
  // GET /todos
  async getTodos(): Promise<Todo[]> {
    await delay(API_DELAY);
    const todos = getStoredTodos();
    console.log('API: GET /todos', todos);
    return todos;
  },

  // POST /todos
  async createTodo(text: string): Promise<Todo> {
    await delay(API_DELAY);
    const todos = getStoredTodos();
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedTodos = [newTodo, ...todos];
    storeTodos(updatedTodos);
    console.log('API: POST /todos', newTodo);
    return newTodo;
  },

  // PATCH /todos/:id
  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await delay(API_DELAY);
    const todos = getStoredTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...updates,
      updatedAt: new Date(),
    };
    
    todos[todoIndex] = updatedTodo;
    storeTodos(todos);
    console.log('API: PATCH /todos/' + id, updatedTodo);
    return updatedTodo;
  },

  // PUT /todos/:id (complete replacement)
  async replaceTodo(id: string, todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
    await delay(API_DELAY);
    const todos = getStoredTodos();
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo: Todo = {
      ...todo,
      id,
      createdAt: todos[todoIndex].createdAt,
      updatedAt: new Date(),
    };
    
    todos[todoIndex] = updatedTodo;
    storeTodos(todos);
    console.log('API: PUT /todos/' + id, updatedTodo);
    return updatedTodo;
  },

  // DELETE /todos/:id
  async deleteTodo(id: string): Promise<void> {
    await delay(API_DELAY);
    const todos = getStoredTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    storeTodos(filteredTodos);
    console.log('API: DELETE /todos/' + id);
  },

  // DELETE /todos/completed (bulk delete)
  async clearCompleted(): Promise<void> {
    await delay(API_DELAY);
    const todos = getStoredTodos();
    const activeTodos = todos.filter(todo => !todo.completed);
    storeTodos(activeTodos);
    console.log('API: DELETE /todos/completed');
  },
};