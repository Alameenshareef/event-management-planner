import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "../services/taskService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks. Please try again.");
      }
    };
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await createTask({ description: newTask, duration: 2 });
      setNewTask("");
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Task Management</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="text"
        className="w-full p-2 border rounded"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Add Task
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="p-2 border-b flex justify-between">
            {task.description}
            <button onClick={() => removeTask(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
