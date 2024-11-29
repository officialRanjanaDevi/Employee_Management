import React, { useEffect, useState } from "react";

const Employee = () => {
  const [data, setData] = useState([]);
  const [page,setPage]=useState(0);

  const [filter,setFilter]=useState("All");
  const applyFilter=(e)=>{
    setFilter(e.target.value); 
   }
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [updatedData, setUpdatedData] = useState({
    id: "",
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
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData();
    formData.append("name", updatedData.name.toLowerCase());
    formData.append("email", updatedData.email);
    formData.append("designation", updatedData.designation);
    formData.append("contact", updatedData.contact);
    formData.append("course", updatedData.course);
    formData.append("gender", updatedData.gender);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/employee/editEmployee/${
          updatedData.id
        }`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const response = await res.json();
      if (response.success) {
        setTimeout(() => {
          setStatus("success");
          setMessage("Employee data updated successfully");
        }, 100);
        setTimeout(() => {
          setStatus("");
          setMessage("");
        }, 3000);

        fetchData();
        setUpdatedData({
          name: "",
          email: "",
          designation: "",
          contact: "",
          course: "",
          gender: "",
        });
        setImage(null);
      } else {
        setTimeout(() => {
          setStatus("failed");
        }, 100);
        setTimeout(() => {
          setStatus("");
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setStatus("failed");
      }, 100);
      setTimeout(() => {
        setStatus("");
        setMessage("");
      }, 3000);
      console.error("Error updating employee data:", error);
    }
  };

  const handleUpdate = async (employee) => {
    setUpdatedData({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      designation: employee.designation,
      contact: employee.contact,
      course: employee.course,
      gender: employee.gender,
    });
  };

  const handleDelete = async (id) => {
    try {
      setStatus("loading");
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/employee/deleteEmployee/${id}`,
        {
          method: "DELETE",
        }
      );
      const response = await res.json();
      if (response.success) {
        fetchData();
        setTimeout(() => {
          setStatus("success");
          setMessage("Employee data deleted successfully");
        }, 100);
        setTimeout(() => {
          setStatus("");
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setStatus("failed");
        setMessage("Failed to delete Employee data");
      }, 100);
      setTimeout(() => {
        setStatus("");
        setMessage("");
      }, 3000);
      console.log(error);
    }
  };

  const fetchData = async () => {
    setStatus("loading");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/employee/viewEmployee/${filter}?page=${page}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setData(response.data);
        setTimeout(() => {
          setStatus("");
          setMessage("");
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setStatus("failed");
        setMessage("Failed to load Employee data");
      }, 100);
      setTimeout(() => {
        setStatus("");
        setMessage("");
      }, 3000);

      console.log(error);
    }
  };

  useEffect(() => {
     console.log(page)
     console.log(filter)
    fetchData();
  }, [page,filter]);


  return (
    <div className="h-screen p-4">
      {status === "success" && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}
      {status === "failed" && (
        <div className="alert alert-danger text-center " role="alert">
          {message}
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

      <div className="flex justify-between mb-4">
        <div className="flex">
          <div className="text-sm border-2 rounded-l-lg px-3 py-1 hover:scale-105 duration-300 cursor-pointer" onClick={()=>{setPage(page>0?page-1:0)}}>
          <i class="fa-solid fa-angles-left"></i>&nbsp;
             Previous
          </div>
          <div className=" border-2 px-3 py-1 font-bold cursor-pointer">
             {page+1}
          </div>
          <div className="text-sm border-2 rounded-r-lg px-3 py-1 hover:scale-105 duration-300 cursor-pointer" onClick={()=>{setPage(page+1)}}>
             Next&nbsp;
             <i class="fa-solid fa-angles-right"></i>
          </div>
          
        </div>
      <select
  id="filter"
  name="filter"
  className="form-select w-40"
  value={filter}
  onChange={applyFilter}
  required
>
  <option value="All">Apply filters</option>
  <option value="name">Name</option>
  <option value="email">Email</option>
  <option value="_id">ID</option>
  <option value="createdAt">Create Date</option>
</select>

      </div>

      <table className="table border-2">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Desiganation</th>
            <th scope="col">Course</th>
            <th scope="col">Contact</th>
            <th scope="col">Created At</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={employee.image}
                  className="h-20 w-20 rounded-md"
                ></img>
              </td>
              <td className="capitalize">{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.designation}</td>
              <td>{employee.course}</td>
              <td>{employee.contact}</td>
              <td>{employee.createdAt.substring(0,10)}</td>
              <td>
                <button
                  className="bg-lime-600 hover:scale-105 duration-300 p-1 text-white w-full rounded-md"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => handleUpdate(employee)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="bg-red-500 hover:scale-105 duration-300 p-1 text-white w-full rounded-md"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal fade  modal-lg" id="staticBackdrop">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="row g-3 mx-auto mt-2 border-2 p-4 rounded-[12px]"
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
                    value={updatedData.name}
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
                    value={updatedData.email}
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
                    value={updatedData.contact}
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
                    value={updatedData.designation}
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
                        checked={updatedData.gender === "Male"}
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
                        checked={updatedData.gender === "Female"}
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
                        checked={updatedData.gender === "Other"}
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
                    value={updatedData.course}
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
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
