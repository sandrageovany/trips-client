import React from 'react';
import { NavLink } from 'react-router-dom';
import { login } from '../api';

class Login extends React.Component {
  state = {
    username: '',

    password: '',
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
   const response= await login(username, password);
    this.props.setCurrentUser(response.data)
    this.props.history.push('/');
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            value={username}
          />

          <label>Password:</label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={password}
          />
          <button>Login</button>
        </form>
        <p>
          Don't have an account?
          <NavLink to="/signup"> Signup</NavLink>
        </p>
      </>
    );
  }
}

export default Login;
