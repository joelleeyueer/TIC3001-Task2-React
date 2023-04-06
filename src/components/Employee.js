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
    <div>
      <h1>Employee Details</h1>
      <p>Name: {employee.name}</p>
      <p>Age: {employee.age}</p>
      <p>Job Title: {employee.jobTitle}</p>
      <p>Salary: {employee.salary}</p>
      <Link to={`/edit/${employee.id}`}>Edit</Link> |{" "}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Employee;
