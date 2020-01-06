import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import api from '~/services/api';

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

export class RotaCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      codigo: '',
      loading: false,
      latCenter: 0,
      lngCenter: 0,
    };
  }

  callMap = async () => {
    const resultList = await api.get(`clientes?codigo=${this.state.codigo}`);

    const points = resultList.data
      .map(ite => ({
        codcfo: ite.codcfo,
        latitude: Number(ite.entrega.latitude),
        longitude: Number(ite.entrega.longitude),
      }))
      .filter(e => e.longitude != null && e.longitude != 0);

    this.setState({
      stores: points,
      latCenter: points[0] !== undefined ? points[0].latitude : 0,
      lngCenter: points[0] !== undefined ? points[0].longitude : 0,
      loading: points.length > 0,
    });
  };

  showMap() {
    return (
      this.state.loading && (
        <Map
          google={this.props.google}
          zoom={15}
          style={mapStyles}
          className="map"
          initialCenter={{
            lat: this.state.latCenter,
            lng: this.state.lngCenter,
          }}
        >
          {this.state.stores.map((store, index) => (
            <Marker
              id={index}
              label={store.codcfo}
              title={store.codcfo}
              position={{
                lat: store.latitude,
                lng: store.longitude,
              }}
            />
          ))}
        </Map>
      )
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={3}>
            <TextField
              name="codigo"
              label="Código"
              value={this.state.codigo}
              margin="normal"
              autoFocus
              onChange={e => this.setState({ codigo: e.target.value })}
            />
          </Col>

          <Col sm={3}>
            <Button
              onClick={() => this.callMap()}
              variant="contained"
              color="primary"
            >
              Carregar
            </Button>
          </Col>
        </Row>

        <div>{this.state.loading && this.showMap()}</div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBmCWe3wRDMOT07OUJEXKUusMWbNEgcHaY',
})(RotaCity);
