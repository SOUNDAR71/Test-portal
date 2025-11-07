import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchQuestions() {
  try {
    const res = await axios.get(`${API_BASE}/api/questions`);
    const formattedData = res.data.map((q) => ({
      id: q._id,
      question: q.question,
      options: q.options,
      correct_option: q.correct_option
    }));
    return formattedData;
  } catch (err) {
    console.error("Error fetching questions:", err);
    return [];
  }
}
