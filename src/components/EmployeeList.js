import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/api/employees/all?offset=0&limit=150")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (id) => {
    console.log("Deleting employee with id:", id);
    axios
      .delete(`http://localhost:8080/api/employees/${id}`)
      .then(() => fetchEmployees())
      .catch((error) => console.log(error));
  };

  const handleEditClick = (employee) => {
    navigate(`/edit/${employee.id}`, { state: { employee } });
  };

  return (
    <div>
      <h1 className="mb-4">Employee List</h1>
      <div className="text-right mb-3">
        <Link to="/add">
          <button type="button" className="btn btn-primary">Add Employee</button>
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Job Title</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.salary}</td>
              <td>
                <button type="button" className="btn btn-outline-info mr-5" onClick={() => handleEditClick(employee)}>Update</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteClick(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
