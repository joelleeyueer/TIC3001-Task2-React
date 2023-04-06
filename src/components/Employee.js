import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employee = ({ match, history }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employees/${match.params.id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.log(error));
  }, [match.params.id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/employees/${match.params.id}`)
      .then(() => history.push("/"))
      .catch((error) => console.log(error));
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Employee Details</h1>
      <div className="row">
        <div className="col-md-6">
          <p className="font-weight-bold">Name:</p>
          <p>{employee.name}</p>
        </div>
        <div className="col-md-6">
          <p className="font-weight-bold">Age:</p>
          <p>{employee.age}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <p className="font-weight-bold">Job Title:</p>
          <p>{employee.jobTitle}</p>
        </div>
        <div className="col-md-6">
          <p className="font-weight-bold">Salary:</p>
          <p>{employee.salary}</p>
        </div>
      </div>
      <div className="mt-3">
        <Link to={`/edit/${employee.id}`} className="btn btn-primary mr-3">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Employee;
