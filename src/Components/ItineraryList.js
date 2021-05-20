import React from 'react';
import { NavLink } from 'react-router-dom';
import { getItinerary, addItinerary, addDestination } from '../api';

class ItineraryList extends React.Component {
  map = null;

  state = {
    title: '',
    user: '',
    destinations: [],
    newDestinations: [],
  };

  async componentDidMount() {
    setTimeout(async () => {
      const itineraryId = this.props.match.params.id;
      const response = await getItinerary(itineraryId);
      this.setState(
        {
          // _id: response.data._id,
          title: response.data.title,
          destinations: response.data.destinations,
        },
        () => {
          this.map = new window.google.maps.Map(
            document.getElementById('map'),
            {
              center: {
                lat: Number(this.state.destinations[0].lat),
                lng: Number(this.state.destinations[0].lng),
              },
              zoom: 15,
            }
          );
          const input = document.getElementById('pac-input');
          const google = window.google;
          const searchBox = new google.maps.places.SearchBox(input);
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
          this.map.addListener('bounds_changed', () => {
            searchBox.setBounds(this.map.getBounds());
          });
  //         this.map.addListener('click', (event) => {
  //           console.log(event.latLng.lat());

  //           const placeId = document.getElementById("place-id").value;
  // geocoder.geocode({ placeId: placeId }, (results, status) => {
  //   if (status === "OK") {
  //     if (results[0]) {
  //       map.setZoom(11);
  //       map.setCenter(results[0].geometry.location);
  //       const marker = new google.maps.Marker({
  //         map,
  //         position: results[0].geometry.location,
  //       });
  //       infowindow.setContent(results[0].formatted_address);
  //       infowindow.open(map, marker);
  //     } else {
  //       window.alert("No results found");
  //     }
  //   } else {
  //     window.alert("Geocoder failed due to: " + status);
  //   }
  // });
  //           this.addNewDestination(
  //             // event.lng,
  //             event.placeId
  //           );
  //         });
          // Listen for the event fired when the user selects a prediction and retrieve
          // more details for that place.
          searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();

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

              console.log('first destination', place.geometry.location);

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
        }
      );
    }, 100);

    console.log(this.state.destinations);
  }

  //  createSearchBox =()=>{

  //   const input = document.getElementById("pac-input");
  //   const searchBox = new google.maps.places.SearchBox(input);
  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  //   // Bias the SearchBox results towards current map's viewport.
  //   map.addListener("bounds_changed", () => {
  //     searchBox.setBounds(map.getBounds());
  //   });
  //  }
  addNewDestination = (placeId) => {
   const newD= { _id: 23,name: placeId,lat:23,lng:-4.654 };

   //get destination details by place id, send the destination details to the api
   //ask user to add to trip then call the fn
   //delete destinations
      this.setState({
        destinations: [...this.state.destinations, newD]
      })
    
  
  };

  createMarker = (position) => {
    const myLatLng = { lat: Number(position.lat), lng: Number(position.lng) };
    const google = window.google;
    new google.maps.Marker({
      position: myLatLng,
      map: this.map,
    });
  };

  drawMarkers = () => {
    this.state.destinations.forEach((destination) => {
      this.createMarker(destination);
    });
  };

  render() {
    return (
      <div>
        <input id="pac-input" type="text" />
        <div style={{ width: 800, height: 500 }} id="map" />

        <ul>
          {this.state.destinations &&
            this.state.destinations.map((destination) => {
              return <li key={destination._id}> {destination.name} </li>;
            })}
        </ul>
        <div>
          <ul>
            <li>
              <div>new destination</div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ItineraryList;
