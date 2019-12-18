import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import api from '~/services/api';

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

export default function RotaCity() {
  const classes = useStyles();
  const [codigo, setCodigo] = useState('');

  const callMap = async () => {
    const resultList = await api.get(`clientes?codigo=${codigo}`);

    console.log('ResultList =>', resultList);
  };

  const handleChange = e => {
    setCodigo({ [e.target.name]: e.target.value.toUpperCase() });
  };

  return (
    <>
      <Row>
        <Col sm={3}>
          <TextField
            id="txtCodigo"
            label="Código"
            value={codigo}
            margin="normal"
            autoFocus
            onChange={handleChange}
          />
        </Col>

        <Col sm={3}>
          <Button onClick={callMap} variant="contained" color="primary">
            Carregar
          </Button>
        </Col>
      </Row>
    </>
  );
}
