import React, { useState } from 'react';
import { registerUser } from "../../api/api";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(form.name, form.email, form.password, form.role);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-10 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className='w-[400px] bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-center font-bold text-lg mb-4'>Register for TestPortal</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p>User Name</p>
          <input type="text" name='name' value={form.name} onChange={handleChange} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required/>

          <p>Email</p>
          <input type="email" name='email' value={form.email} onChange={handleChange} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required/>

          <p>Password</p>
          <input type="password" name='password' value={form.password} onChange={handleChange} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required/>

          <p>Confirm Password</p>
          <input type="password" name='confirmPassword' value={form.confirmPassword} onChange={handleChange} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required/>

          

          <button type="submit" className="mt-2 bg-blue-600 text-white py-2 rounded-3xl hover:bg-blue-700">Register</button>
          <button type="button" onClick={handleCancel} className="text-gray-500 py-2 rounded">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
