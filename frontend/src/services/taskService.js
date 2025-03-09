import axios from "axios";
const API_URL = "http://localhost:3000/api/tasks";

// Helper function to get token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const fetchTasks = async (id) => {
  try {
    const token = getAuthToken();
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const token = getAuthToken();
    await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const token = getAuthToken();
    await axios.put(`${API_URL}/${taskId}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};