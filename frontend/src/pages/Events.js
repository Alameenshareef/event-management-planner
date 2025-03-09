import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://event-management-planner.onrender.com/api/events/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to fetch event. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!event) return <p className="text-center mt-10">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{event.name}</h2>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-4">Date: {new Date(event.date).toDateString()}</p>

      <h3 className="text-xl font-semibold mb-2">Assigned Tasks:</h3>
      {event.tasks && event.tasks.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {event.tasks.map((task) => (
            <li key={task._id} className="p-4 flex justify-between items-center">
              <span>{task.description} ({task.duration} hours)</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks assigned yet.</p>
      )}

      <Link to="/dashboard" className="block text-center bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Event;
