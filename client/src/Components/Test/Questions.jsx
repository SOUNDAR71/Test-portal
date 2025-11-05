import axios from "axios";

export async function fetchQuestions() {
  try {
    const res = await axios.get("http://localhost:5000/api/questions");
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
