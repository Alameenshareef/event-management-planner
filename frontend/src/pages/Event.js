import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEventById } from "../services/eventService";
import { fetchTasks, updateTask, deleteTask } from "../services/taskService";

const Event = () => {
  const { eventId } = useParams();
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    fetchEventById(eventId)
      .then((data) => {
        const eventArray = Array.isArray(data) ? data : [data];
        setEvents(eventArray);

        const taskIds = eventArray.flatMap(event => event.tasks || []);
        if (taskIds.length > 0) {
          return Promise.all(taskIds.map((id) => fetchTasks(id)));
        }
        return [];
      })
      .then((tasksData) => {
        const tasksMap = {};
        tasksData.forEach(task => {
          tasksMap[task._id] = task;
        });
        setTasks(tasksMap);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [eventId]);

  const handleUpdateTask = async (id) => {
    if (!updatedDescription.trim()) return;
    try {
      const updatedTask = await updateTask(id, { description: updatedDescription });
      setTasks({ ...tasks, [id]: updatedTask });
      setEditTask(null);
      setUpdatedDescription("");
    } catch (error) {
      console.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      const updatedTasks = { ...tasks };
      delete updatedTasks[id];
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to delete task");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!events.length) return <p className="text-center mt-10">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {events.map((event) => (
        <div key={event._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">{event.name}</h2>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <p className="text-gray-600 mb-4">Date: {new Date(event.date).toDateString()}</p>

          <h3 className="text-xl font-semibold mb-2">Assigned Tasks:</h3>
          <ul className="divide-y divide-gray-300">
            {event.tasks?.length > 0 ? (
              event.tasks.map((id) => {
                const task = tasks[id];
                return task ? (
                  <li key={task._id} className="p-4 flex justify-between items-center">
                    {editTask === task._id ? (
                      <input
                        type="text"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        className="border p-2 rounded"
                      />
                    ) : (
                      <span>{task.description} ({task.duration} hours)</span>
                    )}

                    <div>
                      {editTask === task._id ? (
                        <button
                          onClick={() => handleUpdateTask(task._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded mx-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditTask(task._id);
                            setUpdatedDescription(task.description);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mx-2"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ) : (
                  <li key={id} className="p-4 text-gray-500">Loading task...</li>
                );
              })
            ) : (
              <p className="text-gray-500">No tasks assigned yet.</p>
            )}
          </ul>
        </div>
      ))}

      <Link to="/dashboard" className="block text-center bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Event;
