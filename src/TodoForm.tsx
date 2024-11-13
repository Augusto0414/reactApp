import React from 'react';
import { Todo } from './types';

interface TodoFormProps {
    newTodo: Todo;
    setNewTodo: React.Dispatch<React.SetStateAction<Todo>>;
    addTodo: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ newTodo, setNewTodo, addTodo }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addTodo();
            }}
            className="mb-8 space-y-4"
        >
            <input
                type="text"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="Título"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Descripción"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
                Agregar TODO
            </button>
        </form>
    );
};

export default TodoForm;
