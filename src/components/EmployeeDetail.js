import React from 'react';

function EmployeeDetail(props) {
  // Find the employee whose id matches the id in the URL
  const employee = props.employees.find(
    (emp) => String(emp.EmployeeId) === props.id
  );

  if (!employee) {
    return (
      <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h2>Employee not found</h2>
        <a href="#/">Back to Employee List</a>
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
      <a href="#/">Back to Employee List</a>
    </div>
  );
}

EmployeeDetail.defaultProps = {
  employees: [],
  id: '',
};

export default EmployeeDetail;
