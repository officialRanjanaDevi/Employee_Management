import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AddEmployee from './pages/AddEmployee'
import Employee from './pages/Employee'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Home from './pages/Home'
const App = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"))
  useEffect(()=>{

  },[username])
  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        
          {username && (<>
            <Route path="/employee" element={<Employee />} />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<Home />} />
          </>)}
          {!username && (<>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Login />} />
          </>)}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
