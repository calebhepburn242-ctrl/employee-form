import React from 'react';
import './EmployeeList.css';

function EmployeeList(props) {
  // Render the employee list
  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <ul>
        {props.employees.map((employee) => (
          <li key={employee.EmployeeId}>
            {/* Create a link to the employee detail page */}
            <a href={`#/employees/${employee.EmployeeId}`}>
              {employee.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

EmployeeList.defaultProps = {
  employees: [],
};

export default EmployeeList;
