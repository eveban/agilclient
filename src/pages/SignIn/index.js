import React from 'react';
import { Form, Input, Button } from '@rocketseat/unform';
import {
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
          <Button>Entrar</Button>
        </Form>
      </Card>
    </Content>
  );
}
