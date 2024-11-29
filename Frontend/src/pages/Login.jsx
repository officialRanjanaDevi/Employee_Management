import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { images } from "../assets/image";
const Login = () => {
  const [status,setStatus]=useState("");
  const [mess,setMess]=useState("")
  const [data, setData] = useState({
    username: "",
    password:""
  });
  const navigate=useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   setStatus("loading")
   

    try {
       console.log(`${import.meta.env.VITE_SERVER_URL}/auth/login`)
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
   
      });

      const response = await res.json();
      if (response.success) {
        setTimeout(() => {
          setStatus("success")
          setMess("Login Success")
        }, 100);
        localStorage.setItem("username",response.data.username)
        navigate("/home")
        setTimeout(() => {
          setStatus("success")
          setMess("Login Success")
        }, 3000);
      } else {
        setTimeout(() => {
          setStatus("success")
          setMess("Login Failed")
        }, 100);
        setTimeout(() => {
          setStatus("")
          setMess("")
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setStatus("success")
        setMess("Login Failed")
      }, 100);
      setTimeout(() => {
        setStatus("")
        setMess("")
      }, 3000);
        console.error("Error while uploading data:", error);
    }
  };

  return (
    <div className="h-screen">
       {status === "success" && (
        <div className="alert alert-success text-center" role="alert">
          {mess}
        </div>
      )}
      {status === "failed" && (
        <div className="alert alert-danger text-center " role="alert">
          {mess}
        </div>
      )}
      {status === "loading" && (
        <div className="my-8">
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        </div>
      )}
      <div className="flex w-2/3 h-3/4  mx-auto mt-4 justify-center items-center border-2  rounded-[12px]">
      <img src={images.login} className='h-full w-1/2'></img>
      <form
        className="row g-3 w-2/3 p-4 h-full"
        onSubmit={handleSubmit}
      
      >
          <h1 className="text-center font-bold">Login form</h1>
        <div className="col-md-12">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={data.username}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={data.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="w-full btn btn-primary">
            Login
          </button>
        </div>
      <p className="text-sm text-center">new user ?<Link to="/register" className="hover:text-blue-700 font-semibold">click here</Link>  to register</p>

      </form>
      </div>
    
    </div>
  );
};

export default Login;
