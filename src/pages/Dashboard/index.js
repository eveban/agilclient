import React from 'react';
import { Form } from '@rocketseat/unform';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <h2>Bem vindo ao Sistema Agillitas de Gestão.</h2>
      <Form />
    </Container>
  );
}
