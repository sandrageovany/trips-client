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
    this.props.history.push('/login')

 }

    render(){
        const {username, password, email}= this.state;
        return(
          <div style={{marginTop:'100px',marginLeft:'350px'}}>
            <form onSubmit={this.handleFormSubmit}>
              <div>
              <label>Username : </label>
              <input onChange={this.handleChange} type="text" name="username" value={username} />
              </div>
              <div>
              <label>Email :</label>
              <input onChange={this.handleChange} type="email" name="email" value={email} />
              </div>
              <div>
              <label>Password :</label>
              <input onChange={this.handleChange} type="password" name="password" value={password}/>
              </div>
              <div>
              <button>Signup</button>
              </div>
            </form>
            <div>
            <p>
              Already have account?
              <NavLink to="/login"> Login</NavLink>
            </p>
            </div>
          </div>
        )
    }
}

export default Signup;