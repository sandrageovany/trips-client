import React from 'react';
import {NavLink} from 'react-router-dom'
import {signup} from '../api'

class Signup extends React.Component{
    state={
        username: '',
        email:'',
        password:'',
    };
    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
          [name]: value,
        });
      };

 handleFormSubmit = async (event) => {
    event.preventDefault();
    const {username, email, password}= this.state;
    await signup(username, email, password);
    this.props.history.push('/')

 }

    render(){
        const {username, password, email}= this.state;
        return(
            <>
            <form onSubmit={this.handleFormSubmit}>
              <label>Username:</label>
              <input onChange={this.handleChange} type="text" name="username" value={username} />
              <label>Email:</label>
              <input onChange={this.handleChange} type="email" name="email" value={email} />
              <label>Password:</label>
              <input onChange={this.handleChange} type="password" name="password" value={password}/>
              <button>Signup</button>
            </form>
            <p>
              Already have account?
              <NavLink to="/login"> Login</NavLink>
            </p>
          </>
        )
    }
}

export default Signup;