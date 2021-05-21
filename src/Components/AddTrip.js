import React from 'react';
import { addItinerary } from '../api';

class AddTrip extends React.Component {
  searchBox = null;
  map = null;

  state = {
    title: '',
    destinations: [],
  };
  async componentDidMount() {
    setTimeout(async () => {
      const initialCenter = {
        lat: 38.7129146,
        lng: -9.1286218,
      };
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        
        center: {
          lat: initialCenter.lat,
          lng: initialCenter.lng
        },
        zoom: 15,
      });
      const input = document.getElementById('pac-input');
      const google = window.google;
      this.searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      this.map.addListener('bounds_changed', () => {
        this.searchBox.setBounds(this.map.getBounds());
      });

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      this.searchBox.addListener('places_changed', () => {
        const places = this.searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        let markers = [];
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log('Returned place contains no geometry');
            return;
          }
          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };
          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map: this.map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );
          console.log('name', place.name);
          console.log('first destination', place.geometry.location.toString());

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
          markers.map((marker) => {
            marker.addListener('click', (event) => {
              console.log(event);
              var newDestination = {
                name: place.name,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };
              var allDestinations = this.state.destinations;
              allDestinations.push(newDestination);
              this.setState({
                destinations: allDestinations,
              });
            });
          });
        });

        this.map.fitBounds(bounds);
      });

      // this.drawMarkers();

      this.map.addListener('click', (event) => {
        console.log(event.latLng.lat());

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ placeId: event.placeId }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              var newDestination = {
                name: results[0].address_components[0].short_name,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              };
              var allDestinations = this.state.destinations;
              allDestinations.push(newDestination);
              this.setState({
                destinations: allDestinations,
              });

              console.log(results[0]);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      });
    }, 100);
  }



  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { title, destinations } = this.state;

    await addItinerary(title, destinations);

    window.location.href = '/mytrips';
  };
  onAddItem = () => {
    this.setState((state) => {
      const destinations = state.destinations.concat(state.value);

      return {
        destinations,
        value: '',
      };
    });
  };
  // handleAddDestination=()=>{
  //

  // }

  // createMarker = (position) => {
  //   // const myLatLng = { lat: Number(position.lat), lng: Number(position.lng)};
  //   const google = window.google;
  //   new google.maps.Marker({
  //     position: position,
  //     map: this.map,
  //   });
  // };

  // drawMarkers = () => {
  //   this.state.destinations.forEach((destination) => {
  //     this.createMarker(destination);
  //   });
  // };
  render() {
    const { title } = this.state;
    return (
      <div style={{display:'flex',marginTop:'60px'}}>
        <div style={{marginRight:'50px'}}>
        <div style={{ width: 1100, height: 750 }} id="map" />
        </div>
        <div>
      
          {this.state.destinations.map((destination) => (
            <p key={destination._id}>{destination.name}</p>
          ))}
        
        <form onSubmit={this.handleFormSubmit}>
          <label>Title</label>
          <input
            onChange={this.handleChange}
            name="title"
            type="text"
            value={title}
          />

          <input style={{height:"40px",width:'300px', top:'10px'}} id="pac-input" type="text" />
          <button type="submit">Create</button>
        </form>
        </div>
      </div>
    );
  }
}

export default AddTrip;
