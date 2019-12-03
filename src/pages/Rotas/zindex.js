import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import 'date-fns';
/** import Grid from '@material-ui/core/Grid'; */
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Map from './Map';
import api from '~/services/api';

const googleMapsApiKey = 'AIzaSyBmCWe3wRDMOT07OUJEXKUusMWbNEgcHaY';

const googleKeyGeo = '&key=AIzaSyBmCWe3wRDMOT07OUJEXKUusMWbNEgcHaY';

export default function Rota(props) {
  const origin = useState([{ lat: -22.667122, lng: -47.673231 }]);
  const [loading, setLoading] = useState(true);
  const [nroRomaneio, setRomaneio] = useState('');
  const [data, novaData] = useState(new Date());
  const [places, setPlaces] = useState([]);

  /**  constructor(props) {
    super(props);
    this.state = {
      origin: [{ lat: -22.667122, lng: -47.673231 }],
      loading: true,
      nroRomaneio: '',
      data: new Date(),
      places: [],
    }; */

  //  this.loadEnderecos = this.loadEnderecos.bind(this);
  //  this.getEnderecosPosition = this.getEnderecosPosition.bind(this);
  // this.handleDateChange = this.handleDateChange.bind(this);
  // }

  function handleDateChange(date) {
    console.log('Data: ', date);
    novaData({ data: moment(date, 'dd/MM/YYYY') });
  }

  /* function handleSubmit(){
    setRomaneio(nroRomaneio);
  } */

  function handleRomaneio() {
    setRomaneio(nroRomaneio);
  }

  async function loadEnderecos() {
    const dataSelected = moment(data, 'YYYY-MM-DD').format('YYYY-MM-DD');

    // Localizando o romaneio
    const romaneio = await api.get(
      `movimentos?romaneio=${nroRomaneio}&dataEmissao=${dataSelected}`
    );

    // Localizar as latitudes / longitudes de cada endereco do romaneio
    const resultList = await getEnderecosPosition(romaneio.data);

    const results = resultList.filter(e => e.endereco != null);
    setPlaces(results);
    setLoading(false);
    // this.setState({ places: results, loading: false });
  }

  async function getEnderecosPosition(resultList) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const result = [];

    const positions = resultList.map(async row => {
      const item = new Object();
      item.codcfo = row.cliente.codcfo;
      item.endereco = row.cliente.rua;
      item.numero = row.cliente.numero;
      item.bairro = row.cliente.bairro;
      item.cidade = row.cliente.cidade;
      const response = await axios.get(
        `${url + item.endereco},${item.numero},${item.cidade}${googleKeyGeo}`
      );
      try {
        item.latitude = response.data.results[0].geometry.location.lat;
        item.longitude = response.data.results[0].geometry.location.lng;
      } catch (e) {
        item.latitude = 0;
        item.longitude = 0;
      }
      result.push(item);
    });

    await Promise.all(positions);

    return result;
  }

  function showMap() {
    return (
      !loading && (
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,drawing,places`}
          markers={places}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: '80vh' }} />}
          mapElement={<div style={{ height: `100%` }} />}
          defaultCenter={{ lat: -22.667122, lng: -47.673231 }}
          initial={origin[0]}
          defaultZoom={11}
        />
      )
    );
  }

  return (
    <div>
      <div>
        <TextField
          id="txtRomaneio"
          label="Romaneio"
          value={nroRomaneio}
          margin="normal"
          autoFocus
        />
      </div>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="txtData"
            label="Data"
            value={data}
            onChange={() => handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => loadEnderecos()}
        >
          Carregar
        </Button>
      </div>
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Codcfo</TableCell>
                <TableCell align="left">Endereco</TableCell>
                <TableCell align="right">Numero</TableCell>
                <TableCell align="left">Bairro</TableCell>
                <TableCell align="left">Cidade</TableCell>
                <TableCell align="right">Latitude</TableCell>
                <TableCell align="right">Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {places.map(row => (
                <TableRow key={row.codcfo}>
                  <TableCell component="th" scope="row">
                    {row.codcfo}
                  </TableCell>
                  <TableCell align="left">{row.endereco}</TableCell>
                  <TableCell align="right">{row.numero}</TableCell>
                  <TableCell align="left">{row.bairro}</TableCell>
                  <TableCell align="left">{row.cidade}</TableCell>
                  <TableCell align="right">{row.latitude}</TableCell>
                  <TableCell align="right">{row.longitude}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
      <div>{!loading && showMap()}</div>
    </div>
  );
}
