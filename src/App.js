import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [employees, setEmployees] = useState([]);

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
