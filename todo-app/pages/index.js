import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo('');
    fetchTodos();
  };

  const updateTodo = async (id, title, status) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status }),
    });
    fetchTodos();
  };

  const markComplete = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'complete' }),
    });
    fetchTodos();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTodo}>Add</button>
      <div style={{ marginTop: '20px' }}>
        {todos
          .filter((todo) => todo.status === 'incomplete')
          .map((todo) => (
            <div key={todo._id} style={{ marginBottom: '10px' }}>
              <input
                value={todo.title}
                onChange={(e) =>
                  updateTodo(todo._id, e.target.value, todo.status)
                }
              />
              <button onClick={() => markComplete(todo._id)}>Mark Complete</button>
            </div>
          ))}
      </div>
    </div>
  );
}
