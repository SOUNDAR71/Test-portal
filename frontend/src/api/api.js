import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const registerUser = async (name, email, password) => {
  return API.post("/adduser", { name, email, password });
};


export const loginUser = async (email, password) => {
  return API.post("/login", { email, password });
};
