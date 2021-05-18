import React from 'react';
import { getAllTrips } from '../api';
import {NavLink} from 'react-router-dom';

class AllTrips extends React.Component {
  state = {
    
    user: this.props.user,
    trips: [],
  };
  async componentDidMount() {
    
    const response = await getAllTrips();
    this.setState({
      trips: response.data,
    });
  }
  render(){
      return(
          <ul>
              {this.state.trips.map((trip)=>{
                  return <li key={trip._id}>
                      <NavLink exact to={`/trip/${trip._id}`}>
                      
                      {trip.title}  
                      </NavLink>
                    
                    
                  </li>
              })}
          </ul>
      )
  }
}

export default AllTrips;
