import React from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from './Components/Landing/Navbar'
import Mainb from './Components/Landing/Mainb'
import Cont from './Components/Landing/cont'
import Cont1 from './Components/Landing/Cont1'
import Footer from './Components/Landing/Footer'
import Register from './Components/Login/Register'
import Login from './Components/Login/Login'
import MCQ from './Components/Test/MCQ'
import Test from './Components/Test/Test'
import PrivateRoute from './Components/Security/PrivateRoute'

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

        {/* Test Pages */}

        <Route path="/mcq" element={<PrivateRoute> <MCQ /></PrivateRoute>}/>
        <Route path="/test" element={<PrivateRoute><Test /></PrivateRoute>}/>
      </Routes>
    </div>
  )
}

export default App
