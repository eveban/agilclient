import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import api from '~/services/api';
import Map from './MapDirectionsRenderer';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  root: {
    padding: theme.spacing(3, 5),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const googleMapsApiKey = 'AIzaSyBmCWe3wRDMOT07OUJEXKUusMWbNEgcHaY';

export default function RotaCity() {
  const classes = useStyles();
  const [codigo, setCodigo] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const callMap = async () => {
    const resultList = await api.get(`clientes?codigo=${codigo}`);

    const resultPlaces = resultList.data.map(ite => ({
      latitude: Number(ite.entrega.latitude),
      longitude: Number(ite.entrega.longitude)
    })).filter(e => e.longitude != null)

    setPlaces(resultPlaces);
    setLoading(true);
  };


  return (
    <>
      <Row>
        <Col sm={3}>
          <TextField
            name="codigo"
            label="Código"
            value={codigo}
            margin="normal"
            autoFocus
            onChange={e => setCodigo(e.target.value)}
          />
        </Col>

        <Col sm={3}>
          <Button onClick={callMap} variant="contained" color="primary">
            Carregar
          </Button>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          {loading !== false && (
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,drawing,places`}
              places={places}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: '80vh' }} />}
              mapElement={<div style={{ height: `100%` }} />}              
              defaultZoom={11}              
            />)}
        </Col>
      </Row>
    </>
  );
}
