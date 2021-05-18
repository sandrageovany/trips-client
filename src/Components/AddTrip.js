import React from 'react';
import { addItinerary } from '../api';

class AddTrip extends React.Component {
  state = {
    title: '',
    destinations: [
      {
        name: '',
        lat: 38.7129146,
        lng: -9.1286218,
      },
    ],
  };
  async componentDidMount() {
    setTimeout(async () => {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: Number(this.state.destinations[0].lat),
          lng: Number(this.state.destinations[0].lng),
        },
        zoom: 15,
      });
      const input = document.getElementById('pac-input');
      const google = window.google;
      const searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      this.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.getBounds());
      });

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        addItinerary(123);

        if (places.length == 0) {
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

          console.log('first destination', place.geometry.location.toString());

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });

      this.drawMarkers();
    }, 100);
  }

  handleFileChange = (event) => {
    this.setState({
      imageUrl: event.target.files[0],
    });
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { title, destinations } = this.state;

    const newItinerary = {
      title,
      destinations,
    };
    await addItinerary(newItinerary);

    this.props.history.push('/mytrips');
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

  createMarker = (position) => {
    // const myLatLng = { lat: Number(position.lat), lng: Number(position.lng)};
    const google = window.google;
    new google.maps.Marker({
      position: position,
      map: this.map,
    });
  };

  drawMarkers = () => {
    this.state.destinations.forEach((destination) => {
      this.createMarker(destination);
    });
  };
  render() {
    const { title, destinations } = this.state;
    return (
      <>
        <input id="pac-input" type="text" />
        <div style={{ width: 800, height: 500 }} id="map" />
        <form onSubmit={this.handleFormSubmit}>
          <label>Title</label>
          <input
            onChange={this.handleChange}
            name="title"
            type="text"
            value={title}
          />
          <label>Destinations</label>

          <ul>
            {this.state.destinations.map((destination) => (
              <li key={destination._id}>
                {destination.name}
                {destination.lat}
                {destination.lng}
              </li>
            ))}
          </ul>

          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button
            type="button"
            onClick={this.onAddItem}
            disabled={!this.state.value}
          >
            Add destination
          </button>

          <button type="submit">Create</button>
        </form>
      </>
    );
  }
}

export default AddTrip;
