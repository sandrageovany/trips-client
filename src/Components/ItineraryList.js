import React from 'react';
import { getItinerary } from '../api';

class ItineraryList extends React.Component {
  map= null;

  state = {
    title: '',
    user: '',
    destinations: [],
  };

  async componentDidMount() {    
    const itineraryId = this.props.match.params.id;
    const response = await getItinerary(itineraryId);
    this.setState({
      _id: response.data._id,
      title: response.data.user,
      destinations: response.data.destinations,
    });
    setTimeout(() => {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.7117164, lng: -9.1264315 },
        zoom: 15,
      });
    }, 100);

    console.log(this.state.destinations);
  }

 
 initMap= ()=> {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });
    const google = window.google;

    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
   
  }

  // createMarker = (position) => {
    const myLatLng = { lat: -25.363, lng: 131.044 };
  //   const google = window.google;
  //   new google.maps.Marker({
  //     position: myLatLng,
  //     map: this.map,
      
  //   });
  // };
  
  // drawMarkers = () => {
  //   this.state.destinations.forEach((destination) => {
  //     this.createMarker(destination);
  //   });
  // };

  
  render() {
    return (
      <>
       <div style={{ width: 800, height: 500 }} id="map"/>
      
        <ul>
          {this.state.destinations &&
            this.state.destinations.forEach((destination) => {
              return <li key={destination._id}> {this.createMarker(destination)}</li>;
            })}
        </ul>
       
      </>
    );
  }
}

export default ItineraryList;
