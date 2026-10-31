import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';

function App() {
  // Load saved employees from local storage (and give older entries an id)
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem('employees');
      const list = saved ? JSON.parse(saved) : [];
      return list.map((emp, index) => ({
        ...emp,
        EmployeeId: emp.EmployeeId || Date.now() + index,
      }));
    } catch (error) {
      return [];
    }
  });

  // Save the employees to local storage every time the list changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    const newEmployee = { ...employee, EmployeeId: Date.now() };
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <EmployeeForm onAddEmployee={addEmployee} />
              <EmployeeList employees={employees} />
            </>
          }
        />
        <Route
          path="/employees/:id"
          element={<EmployeeDetail employees={employees} />}
        />
      </Routes>
    </div>
  );
}

export default App;
