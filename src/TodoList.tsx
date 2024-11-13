import React from 'react';
import { Todo } from './types';

interface TodoListProps {
    todos: Todo[];
    toggleTodoCompletion: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodoCompletion, deleteTodo }) => {
    return (
        <ul className="space-y-6">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="todo-item flex justify-between items-center bg-gray-50 p-6 rounded-lg shadow-md"
                >
                    <div>
                        <span className={`text-lg font-semibold ${todo.completed ? 'line-through' : ''}`}>
                            {todo.title}
                        </span>
                        <p className="text-sm text-gray-500">{todo.description}</p>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodoCompletion(todo.id, todo.completed)}
                            className="h-6 w-6 text-blue-500 cursor-pointer"
                        />
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
