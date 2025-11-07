import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;
console.log("API_BASE=", API_BASE);

// ==================== LOGIN ====================
export const loginUser = async (email, password) => {
  return await axios.post(`${API_BASE}/login`, { email, password });
};

// ==================== REGISTER ====================
export const registerUser = async (name, email, password) => {
  return await axios.post(`${API_BASE}/register`, { name, email, password });
};

// ==================== FETCH QUESTIONS ====================
export const fetchQuestions = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please login.");

  const res = await axios.get(`${API_BASE}/api/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
