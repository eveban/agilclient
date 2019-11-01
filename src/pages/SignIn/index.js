import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import {
  Button,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import logo from '~/assets/logo.svg';
import { Content, Card } from './styles';

export default function SignIn() {
  function handleSubmit() {}

  return (
    <Content>
      <Card>
        <img src={logo} alt="GoBarber" />
        <Typography>LOGIN TO YOUR ACCOUNT</Typography>
        <Form name="loginForm" onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />
          <Button>Olá</Button>
        </Form>
      </Card>
    </Content>
  );
}
