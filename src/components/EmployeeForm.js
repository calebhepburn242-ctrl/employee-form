import React, { Component } from 'react';
import './EmployeeForm.css';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      title: '',
      department: '',
    };
  }

  // Updates the matching piece of state whenever an input changes
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Logs the new employee, sends it up to the parent through a prop, then clears the form
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.onAddEmployee(this.state);
    this.setState({
      name: '',
      email: '',
      title: '',
      department: '',
    });
  };

  render() {
    const { name, email, title, department } = this.state;

    return (
      <form className="employee-form" onSubmit={this.handleSubmit}>
        <h2>Add Employee</h2>

        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={this.handleChange}
            required
          />
        </div>

        <button type="submit">Add</button>
      </form>
    );
  }
}

EmployeeForm.defaultProps = {
  onAddEmployee: () => {},
};

export default EmployeeForm;
