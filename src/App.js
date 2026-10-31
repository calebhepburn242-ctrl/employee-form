import React, { useState, useEffect } from 'react';
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

  // Simple page switching: read the page from the URL hash (#/employees/123)
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    // Clean up the listener when the component unmounts
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const match = hash.match(/^#\/employees\/(.+)$/);
  const selectedId = match ? match[1] : null;

  const addEmployee = (employee) => {
    const newEmployee = { ...employee, EmployeeId: Date.now() };
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div className="App">
      {selectedId ? (
        <EmployeeDetail employees={employees} id={selectedId} />
      ) : (
        <>
          <EmployeeForm onAddEmployee={addEmployee} />
          <EmployeeList employees={employees} />
        </>
      )}
    </div>
  );
}

export default App;
