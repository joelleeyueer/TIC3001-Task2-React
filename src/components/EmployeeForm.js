import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useMatch } from "react-router-dom";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: "",
    age: 0,
    jobTitle: "",
    salary: 0,
  });

const navigate = useNavigate();
const { id } = useParams();
const match = useMatch("/edit/:id");
const isEditMode = match && match.params.id === id;

useEffect(() => {
if (isEditMode) {
    axios
    .get(`http://localhost:8080/api/employees/${id}`)
    .then((response) => setEmployee(response.data))
    .catch((error) => console.log(error));
}
}, [isEditMode, id]);


  
const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
    };
    
const handleSubmit = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(employee).toString();
    if (isEditMode) {
        axios
        .put(`http://localhost:8080/api/employees/update?${urlParams}`, {
            ...employee,
            id: parseInt(id),
        })
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    } else {
        axios
        .post(`http://localhost:8080/api/employees/insert?${urlParams}`)
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    }
};
    
return (
    <div>
        <h1>{isEditMode ? "Edit" : "Add"} Employee</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Name:</label>
            <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            />
        </div>
        <div>
            <label>Age:</label>
            <input
            type="number"
            name="age"
            value={employee.age}
            onChange={handleChange}
            />
        </div>
        <div>
            <label>Job Title:</label>
            <input
            type="text"
            name="jobTitle"
            value={employee.jobTitle}
            onChange={handleChange}
            />
        </div>
        <div>
            <label>Salary:</label>
            <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            />
        </div>
        <button type="submit">
            {isEditMode ? "Update" : "Add"} Employee
        </button>
        </form>
    </div>
    );
};
    
export default EmployeeForm;
    
  