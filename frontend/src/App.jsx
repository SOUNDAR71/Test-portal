import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Landing Page Components
import Navbar from "./Components/landing/Navbar";
import Mainb from "./Components/landing/Mainb";
import Cont from "./Components/landing/Cont";
import Cont1 from "./Components/landing/Cont1";
import Footer from "./Components/landing/Footer";

// Auth Components
import Register from "./Components/Login/Register";
import Login from "./Components/Login/Login";

// Test Components
import MCQ from "./Components/Test/MCQ";
import Test from "./Components/Test/Test";

// Security
import PrivateRoute from "./Components/Security/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Mainb />
              <Cont />
              <Cont1 />
              <Footer />
            </>
          }
        />

        {/* Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}
        <Route
          path="/mcq"
          element={
            <PrivateRoute>
              <MCQ />
            </PrivateRoute>
          }
        />

        <Route
          path="/test"
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}


export default App;
