import axios from "axios";

export async function fetchQuestions() {
  try{
    const res = await axios.get("http://localhost:5000/api/questions");
    return res.data;
  }catch(err){
    console.error("Error fetching questions:", err);
    return [];
  }
}
