import axios from "axios";

const API_URL = "https://test-portal-1.onrender.com/";

// ==================== LOGIN ====================
export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

// ==================== REGISTER ====================
export const registerUser = async (name, email, password) => {
  return await axios.post(`${API_URL}/register`, { name, email, password });
};

// ==================== FETCH QUESTIONS ====================
export const fetchQuestions = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login.");

  const res = await axios.get(`${API_URL}/api/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
