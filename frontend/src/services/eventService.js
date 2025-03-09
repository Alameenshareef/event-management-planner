import axios from "axios";

const API_URL = "http://localhost:3000/api/events";

// Helper function to get token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Fetch all events
export const fetchEvents = async (userId) => {
  console.log({userId});
  
  try {
    const token = getAuthToken();
    const res = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("events", res);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Fetch a single event by ID
export const fetchEventById = async (id) => {
  console.log({id});
  
  try {
    const token = getAuthToken();
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

// Create a new event
export const createEvent = async (eventData) => {
  try {
    const token = getAuthToken();
    await axios.post(API_URL, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (eventId) => {
  try {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};