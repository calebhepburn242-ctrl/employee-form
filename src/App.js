import React, { useState, useEffect } from 'react';
import { EmployeeProvider, useEmployees, addEmployee } from './EmployeeContext';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';

function AppContent() {
  const { employees, dispatch } = useEmployees();

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

  return (
    <div className="App">
      {selectedId ? (
        <EmployeeDetail employees={employees} id={selectedId} />
      ) : (
        <>
          <EmployeeForm onAddEmployee={(emp) => dispatch(addEmployee(emp))} />
          <EmployeeList />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <EmployeeProvider>
      <AppContent />
    </EmployeeProvider>
  );
}

export default App;
