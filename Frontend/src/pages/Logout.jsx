import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    localStorage.removeItem("username");
    navigate("/")
 
  },[])

   return (
    <div className='h-screen '>
      <p className='text-center font-bold'>
      Logout failed
      </p>
     
    </div>
  )
}

export default Logout
