import React, { useState } from 'react';
import { useEmployees, deleteEmployee } from '../EmployeeContext';
import './EmployeeList.css';

function EmployeeList() {
  const { employees, dispatch } = useEmployees();
  const [query, setQuery] = useState('');

  // Show only employees whose name matches the search box
  const shown = employees.filter((emp) =>
    emp.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <input
        type="search"
        className="search-box"
        placeholder="Search by name"
        aria-label="Search employees by name"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {shown.length === 0 ? (
        <p className="empty-message">No employees found.</p>
      ) : (
        <ul>
          {shown.map((emp) => (
            <li key={emp.EmployeeId}>
              <a href={`#/employees/${emp.EmployeeId}`}>{emp.name}</a>
              <button
                type="button"
                className="delete-btn"
                aria-label={`Delete ${emp.name}`}
                onClick={() => dispatch(deleteEmployee(emp.EmployeeId))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
