import axios from "axios";

export async function fetchQuestions() {
  try{
    const res = await axios.get("https://test-portal-1.onrender.com/");
    return res.data;
  }catch(err){
    console.error("Error fetching questions:", err);
    return [];
  }
}
