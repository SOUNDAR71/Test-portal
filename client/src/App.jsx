import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Landing Page Components
import Navbar from "./Components/lpage/Navbar.jsx";
import Mainb from "./Components/lpage/Mainb.jsx";
import Cont from "./Components/lpage/cont.jsx";
import Cont1 from "./Components/lpage/Cont1.jsx";
import Footer from "./Components/lpage/Footer.jsx";

// Auth Components
import Register from "./Components/Login/Register.jsx";
import Login from "./Components/Login/Login.jsx";

// Test Components
import MCQ from "./Components/Test/MCQ.jsx";
import Test from "./Components/Test/Test.jsx";

// Security
import PrivateRoute from "./Components/Security/PrivateRoute.jsx";

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
