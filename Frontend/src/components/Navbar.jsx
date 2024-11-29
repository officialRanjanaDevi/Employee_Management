import React from 'react'
import {Link} from 'react-router-dom';
const Navbar = () => {
  
  return (
    <div className='h-12 bg-gradient-to-r from-sky-600 to-blue-500 text-white text-sm font-bold flex items-center justify-between p-4'>
      <div className='basis-1/2 flex justify-evenly '>

     
       <Link className="hover:scale-110  duration-700" to="/">Home</Link>
      
       {localStorage.getItem("username")&&  <Link className="hover:scale-110  duration-700" to="/addEmployee">AddEmployee</Link>}
       {localStorage.getItem("username")&&   <Link className="hover:scale-110  duration-700" to="/employee">Employee List</Link>}
     
       </div>
       <div className='basis-1/3 flex justify-evenly'>
       {!localStorage.getItem("username")&&   <Link className="hover:scale-110  duration-700" to="/login">Login</Link>}
       
          {!localStorage.getItem("username")&& <Link className="hover:scale-110  duration-700" to="/register">Register</Link> }
          {localStorage.getItem("username")&&    <Link className="hover:scale-110  duration-700" to="/logout">Logout</Link>}
   
       </div>
       </div>
  )
}

export default Navbar
