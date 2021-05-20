import React from 'react';
import { getMyTrips } from '../api';
import {NavLink} from 'react-router-dom';

class MyTrips extends React.Component {
  state = {
    trips: [],
  };
  async componentDidMount() {
    
    const response = await getMyTrips();
    this.setState({
      trips: response.data,
    });
  }
  render(){
      return(
        <div>
          <ul>
              {this.state.trips.map((trip)=>{
                  return <li key={trip._id}>
                      <NavLink exact to={`/trip/${trip._id}`}>
                      
                      {trip.title}  
                      </NavLink>
                    
                    
                  </li>
              })}

          </ul>
          <NavLink exact to={`/trips/add`}>
                      Add trip  
                      </NavLink>
                    
          </div>
      )
  }
}

export default MyTrips;
