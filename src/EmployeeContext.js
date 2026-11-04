import React, { createContext, useContext, useReducer, useEffect } from 'react';

const EmployeeContext = createContext(null);

// Action types (the same idea as Redux action types)
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

// Action creators: functions that build action objects
export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: { ...employee, EmployeeId: Date.now() },
});
export const deleteEmployee = (id) => ({ type: DELETE_EMPLOYEE, payload: id });

// Reducer: a pure function that returns the next state
function employeeReducer(state, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return [...state, action.payload];
    case DELETE_EMPLOYEE:
      return state.filter((emp) => emp.EmployeeId !== action.payload);
    default:
      return state;
  }
}

// Load saved employees from local storage (and give older entries an id)
function loadEmployees() {
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
}

// Provider: shares the store (state + dispatch) with every component inside it
export function EmployeeProvider({ children }) {
  const [employees, dispatch] = useReducer(employeeReducer, [], loadEmployees);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  return (
    <EmployeeContext.Provider value={{ employees, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
}

// Custom hook so components can read the store easily
export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used inside an EmployeeProvider');
  }
  return context;
}
