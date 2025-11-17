import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// ==================== LOGIN ====================
export const loginUser = async (email, password) => {
  return await axios.post(`${API_BASE}/login`, { email, password });
};

// ==================== REGISTER ====================
export const registerUser = async (name, email, password) => {
  return await axios.post(`${API_BASE}/register`, { name, email, password });
};

// ==================== FETCH QUESTIONS (Protected) ====================
export const fetchQuestions = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login again.");

  const res = await axios.get(`${API_BASE}/api/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.map((q) => ({
    id: q._id,
    question: q.question,
    options: q.options,
    correct_option: q.correct_option
  }));
};

// ==================== TEST PROTECTED ACCESS ====================
export const fetchSecureData = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login again.");

  const res = await axios.get(`${API_BASE}/mcq`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const submitScore = async (score, total) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${API_BASE}/submit-score`, 
    { score, total },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};
