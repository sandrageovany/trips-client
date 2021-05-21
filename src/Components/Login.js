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
    const response = await login(username, password);
    this.props.setCurrentUser(response.data);
    this.props.history.push('/mytrips');
  };

  render() {
    const { username, password } = this.state;
    return (
      <div style={{ marginTop: '100px', marginLeft: '350px' }}>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>Username:</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="username"
              value={username}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={password}
            />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>

        <div>
          <p>
            Don't have an account?
            <NavLink to="/signup"> Signup</NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
