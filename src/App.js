import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';

function App() {
  // Load any saved employees from local storage when the app first starts
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem('employees');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  // Save the employees to local storage every time the list changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  return (
    <div className="App" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <EmployeeForm onAddEmployee={addEmployee} />
      <h2>Employee List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {employees.map((emp, index) => (
          <li key={index}>
            {emp.name} ({emp.email}) - {emp.title}, {emp.department}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
