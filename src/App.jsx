import { useState } from 'react'
import './App.css'
import Login from './Pages/AdminLogin'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from './Pages/AdminDashboard';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<AdminDashboard />}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
