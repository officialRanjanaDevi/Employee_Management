import React, { useState } from "react";
import { images } from "../assets/image";
const AddEmployee = () => {
  const [status,setStatus]=useState("");
  const [mess,setMess]=useState("")
  const [data, setData] = useState({
    name: "",
    email: "",
    designation: "",
    contact: "",
    course: "",
    gender: "",
  });
  const [image, setImage] = useState(null); 

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   setStatus("loading")
    // Create FormData object
    const formData = new FormData();
    formData.append("name", data.name.toLowerCase());
    formData.append("email", data.email);
    formData.append("designation", data.designation);
    formData.append("contact", data.contact);
    formData.append("course", data.course);
    formData.append("gender", data.gender);
    formData.append("image", image); 

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/employee/addEmployee`, {
        method: "POST",
        body: formData, 
      });

      const response = await res.json();
      if (response.success) {
        setTimeout(() => {
          setStatus("success")
          setMess("Employee data added successfully")
        }, 100);
        setData({ name: "",
          email: "",
          designation: "",
          contact: "",
          course: "",
          gender: "",})
          setTimeout(() => {
            setStatus("")
            setMess("")
          }, 3000);
      } else {
        setTimeout(() => {
          setStatus("failed")
          setMess("Failed to add Employee data ")
        }, 100);
        setTimeout(() => {
          setStatus("")
          setMess("")
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setStatus("failed")
        setMess("Failed to add Employee data ")
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
      <div className="flex w-[90%] mx-auto mt-12 border-2  p-4 rounded-[12px]">
    
<img src={images.add} className="w-1/3"></img>
      <form
        className="row g-3 w-2/3 "
        onSubmit={handleSubmit}
      >
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="contact" className="form-label">
            Contact
          </label>
          <input
            type="number"
            className="form-control"
            id="contact"
            name="contact"
            value={data.contact}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            className="form-select"
            value={data.designation}
            onChange={onChange}
            required
          >
            <option value="">Choose...</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="Male"
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="Female"
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="other"
                value="Other"
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="course" className="form-label">
            Course
          </label>
          <select
            id="course"
            name="course"
            className="form-select"
            value={data.course}
            onChange={onChange}
            required
          >
            <option value="">Choose...</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={onFileChange}
            required
          />
        </div>
        
        <div className="col-12 mt-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
              required
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I declare that all values are correct of this employee
            </label>
          </div>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary w-1/3 " >
            Add
          </button>
        </div>
      </form>
          
      </div>
    </div>
  );
};

export default AddEmployee;
