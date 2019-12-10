import React, { Component } from 'react';
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

export default class Rota extends Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: [{ lat: -22.667122, lng: -47.673231 }],
      loading: true,
      nroRomaneio: '',
      data: new Date(),
      places: [],
    };
    // this.loadEnderecos = this.loadEnderecos.bind(this);
    // this.getEnderecosPosition = this.getEnderecosPosition.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = date => {
    console.log('Data: ', date);
    this.setState({ data: moment(date, 'dd/MM/YYYY') });
  };

  setValue(field, event) {
    const object = {};
    if (event.target.value.toUpperCase !== undefined) {
      object[field] = event.target.value.toUpperCase();
    } else {
      object[field] = event.target.value;
    }
    this.setState(object);
  }

  loadEnderecos = async () => {
    const dataSelected = moment(this.state.data, 'YYYY-MM-DD').format(
      'YYYY-MM-DD'
    );

    // const url = `http://187.9.38.146:3333/movimentos?romaneio=${this.state.nroRomaneio}&dataEmissao=${dataSelected}`;

    // Localizando o romaneio
    const romaneio = await api.get(
      `movimentos?romaneio=${this.state.nroRomaneio}&dataEmissao=${dataSelected}`
    );

    // Localizar as latitudes / longitudes de cada endereco do romaneio
    const resultList = await this.getEnderecosPosition(romaneio.data);

    const results = resultList.filter(e => e.endereco != null);

    this.setState({ places: results, loading: false });
  };

  getEnderecosPosition = async resultList => {
    // "http://maps.googleapis.com/maps/api/geocode/json?address=Via+do+conhecimento,km1,+Pato+Branco,PR";
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const result = [];

    const positions = resultList.map(async row => {
      const item = new Object();
      item.codcfo = row.cliente.codcfo;
      item.endereco = row.cliente.rua;
      item.numero = row.cliente.numero;
      item.bairro = row.cliente.bairro;
      item.cidade = row.cliente.cidade;
      if (row.entrega.latitude !== null) {
        item.latitude = Number(row.entrega.latitude);
        item.longitude = Number(row.entrega.longitude);
      } else {
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
      }
      result.push(item);
    });

    await Promise.all(positions);

    result.sort(function (a, b) {
      return a.longitude < b.longitude ? -1 : a.longitude > b.longitude ? 1 : 0;
    });

    return result;
  };

  showMap() {
    return (
      !this.state.loading && (
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,drawing,places`}
          markers={this.state.places}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: '80vh' }} />}
          mapElement={<div style={{ height: `100%` }} />}
          defaultCenter={{ lat: -22.667122, lng: -47.673231 }}
          initial={this.state.origin[0]}
          defaultZoom={11}
        />
      )
    );
  }

  saveRoutes() {
    const listRoutes = this.state.places.map((ite, index) => ({
      codcfo: ite.codcfo,
      data: new Date(),
      ordem: index,
      romaneio: this.state.nroRomaneio
    }))

    const url = 'http://187.9.38.146:3333/rotas';
    const response = axios.post(url, { listRoutes })
      .then(res => {
        console.logs(res);
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            id="txtRomaneio"
            label="Romaneio"
            value={this.state.nroRomaneio}
            margin="normal"
            autoFocus
            onChange={this.setValue.bind(this, 'nroRomaneio')}
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
              value={this.state.data}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={{ display: 'flex', flexDirection: "column"}}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.setState({ loading: true }, () => this.loadEnderecos())
              }
            >
              Carregar
          </Button>
          </div>

          <div>
            <Button
              variant="contained"
              color="secundary"
              onClick={() => this.saveRoutes()}
            >
              Salvar
          </Button>
          </div>
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
                {this.state.places.map(row => (
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
        <div>{!this.state.loading && this.showMap()}</div>
      </div>
    );
  }
}
