import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Employee from "./components/Employee";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route index path="/" element={<EmployeeList />} />
            <Route path="/add" element={<EmployeeForm />} />
            <Route path="/edit/:id" element={<EmployeeForm />} />
            <Route path="/:id" element={<Employee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
