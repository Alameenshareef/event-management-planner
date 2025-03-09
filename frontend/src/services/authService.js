import axios from "axios";

const API_URL = "https://event-management-planner.onrender.com/api/auth";

export const registerUser = async (userData) => {
    try {
        await axios.post(`${API_URL}/register`, userData);
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const res = await axios.post(`${API_URL}/login`, userData);
        return res.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const logoutUser = () => {
    try {
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};


export const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: token },
    });
    return res.data;
  };
