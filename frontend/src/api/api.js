import axios from "axios";

const API_URL = "http://localhost:5000";

// ==================== LOGIN ====================
export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

// ==================== REGISTER ====================
export const registerUser = async (name, email, password) => {
  return await axios.post(`${API_URL}/register`, { name, email, password });
};
