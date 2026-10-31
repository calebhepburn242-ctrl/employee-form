import React from 'react';
import { Link, useParams } from 'react-router-dom';

function EmployeeDetail(props) {
  // Read the employee id from the URL (/employees/:id)
  const { id } = useParams();
  const employee = props.employees.find(
    (emp) => String(emp.EmployeeId) === id
  );

  if (!employee) {
    return (
      <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h2>Employee not found</h2>
        <Link to="/">Back to Employee List</Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Job Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <Link to="/">Back to Employee List</Link>
    </div>
  );
}

EmployeeDetail.defaultProps = {
  employees: [],
};

export default EmployeeDetail;
