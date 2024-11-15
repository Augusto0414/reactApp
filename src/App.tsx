import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Todo } from './types';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { API_URL } from './config/constants';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: '',
    title: '',
    description: '',
    completed: false,
  });


  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/todo`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async () => {
    if (!newTodo.title || !newTodo.description) {
      alert('El título y la descripción son obligatorios.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/todo`, newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ id: '', title: '', description: '', completed: false });
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const toggleTodoCompletion = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = { ...todos.find(todo => todo.id === id), completed: !completed };
      await axios.put(`${API_URL}/todo/${id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div className="todo-app max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl mt-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Mis Tareas</h1>
      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoList todos={todos} toggleTodoCompletion={toggleTodoCompletion} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
