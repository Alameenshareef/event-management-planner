import { useEffect, useState, useContext } from "react";
import { fetchEvents } from "../services/eventService";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from local storage
    if (user?._id && token) {
      fetchEvents(user._id, token).then(setEvents).catch(console.error);
    }
  }, [user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-8 px-4 sm:px-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name || "Guest"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            {user ? "Manage your upcoming events" : "Sign in to create and manage events"}
          </p>
        </div>
        {user && (
          <Link
            to="/events/new"
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-medium"
          >
            + Create Event
          </Link>
        )}
      </header>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No events yet. Create one!</p>
          ) : (
            events.map((event) => (
              <li key={event._id} className="group hover:bg-gray-50 transition-colors">
                <div className="p-5 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {event.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/events/${event._id}`} className="text-blue-600 hover:text-blue-800">
                    View Details →
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
