import axios from "axios";

export async function fetchQuestions() {
  try{
    const res = await axios.get("https://my-backend.vercel.app");
    return res.data;
  }catch(err){
    console.error("Error fetching questions:", err);
    return [];
  }
}
