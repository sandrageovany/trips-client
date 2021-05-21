import React from 'react';
import { getMyTrips } from '../api';
import { NavLink } from 'react-router-dom';

class MyTrips extends React.Component {
  state = {
    trips: [],
  };
  async componentDidMount() {
    setTimeout(() => {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.7117164, lng: -9.1264315 },
        zoom: 15,
      });
      const input = document.getElementById('pac-input');
      const google = window.google;
      this.searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      this.map.addListener('bounds_changed', () => {
        this.searchBox.setBounds(this.map.getBounds());
      });

    }, 100);
    const response = await getMyTrips();
    this.setState({
      trips: response.data,
    });
  }
  render() {
    return (
      <div>
        <div style={{ display: 'flex', marginTop: '60px' }}>
          <div style={{ marginRight: '50px' }}>

          <input style={{height:"40px",width:'300px', top:'10px'}} id="pac-input" type="text" />
            <div style={{ width: 1100, height: 750 }} id="map" />
          </div>
          <div>
           
            {this.state.trips.map((trip) => {
              return (
                <p key={trip._id}>
                  <NavLink exact to={`/trip/${trip._id}`}>
                    {trip.title}
                  </NavLink>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MyTrips;
