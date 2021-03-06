/* global google */
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';

class MapDirectionsRenderer extends Component {
  state = {
    directions: null,
    error: null,
  };

  componentDidMount() {
    const { places, initial, setPlacesOrder } = this.props;

    const waypoints = places.map(p => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true,
    }));

    // const origin = waypoints.shift().location;
    const origin = initial;
    const destination = waypoints.length !== 0 ? waypoints.pop().location : [];

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        //provideRouteAlternatives: false,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        avoidHighways: true,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {   
          
          setPlacesOrder(result.routes[0].waypoint_order);
          this.setState({
            directions: result,
          });
        } else {
          this.setState({ error: result });
        }
      }
    );
  }

  render() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
    return (
      this.state.directions && (
        <DirectionsRenderer directions={this.state.directions} />
      )
    );
  }
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => {
        const position = { lat: marker.latitude, lng: marker.longitude };
        return <Marker key={index} position={position} />;
      })}
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
        initial={props.initial}
        setPlacesOrder={props.setPlacesOrder}
      />
    </GoogleMap>
  ))
);

export default Map;
