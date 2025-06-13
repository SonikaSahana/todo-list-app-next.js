// pages/completed.js
import { useEffect, useState } from 'react';

export default function CompletedPage() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      const res = await fetch('/api/todos');
      const data = await res.json();
      const completed = data.filter((todo) => todo.status === 'complete');
      setCompletedTodos(completed);
    };
    fetchCompleted();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Completed Tasks</h1>
      {completedTodos.length === 0 && <p>No completed tasks yet.</p>}
      {completedTodos.map((todo) => (
        <div key={todo._id} style={{ marginBottom: '10px', opacity: 0.7 }}>
          <span>{todo.title}</span>
        </div>
      ))}
    </div>
  );
}
