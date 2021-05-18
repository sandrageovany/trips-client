import './App.css';
//import ListProjects from './Components/AllTrips';
import { Switch, Route } from 'react-router-dom';


import Navbar from './Components/Navbar';

import Signup from './Components/Signup';
import Login from './Components/Login';
import React from 'react';
import { loggedin } from './api';
import ItineraryList from './Components/ItineraryList';
import AllTrips from './Components/AllTrips';
import MyTrips from './Components/MyTrips';
import AddTrip from './Components/AddTrip';

class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  async componentDidMount() {
    if (this.state.loggedInUser === null) {
      const response = await loggedin();
      if (response.data._id) {
        this.setCurrentUser(response.data);
      }
    }
  }

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };
  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <Navbar
          loggedInUser={loggedInUser}
          setCurrentUser={this.setCurrentUser}
        />
        <Switch>
          <Route exact path='/trips' component={AllTrips} />
          <Route exact path='/trips/add' component={AddTrip} />
          <Route exact path="/trip/:id" component={ItineraryList} />
          <Route exact path='/mytrips' component= {MyTrips}/>
          <Route exact path="/signup" component={Signup} /> 
          <Route
            exact
            path="/login"
            render={(props) => {
              return <Login {...props} setCurrentUser={this.setCurrentUser} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
