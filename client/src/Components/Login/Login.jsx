import React, { useState } from "react";
import { loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form.email, form.password);

      //  Check if response contains token
      if (res && res.data && res.data.token) {
        // Save JWT and user info in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.data.user?.name,
            email: res.data.user?.email,
            role: res.data.user?.role,
          })
        );

        // Debugging — view JWT in browser console
        console.log("JWT Token:", res.data.token);

        //  Navigate to dashboard or MCQ page
        navigate("/mcq");
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-100">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-8 fade-in">
        <h1 className="text-center font-bold text-2xl mb-4">Login</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
          </label>

          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white py-2 rounded-3xl hover:bg-blue-700"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-500 py-2 rounded hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
