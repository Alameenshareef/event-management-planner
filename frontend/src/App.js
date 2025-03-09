import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Events from "./pages/Events";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<CreateEvent />} /> 
          <Route path="/events/:eventId" element={<Event />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
