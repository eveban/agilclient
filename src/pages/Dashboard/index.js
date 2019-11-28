import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <h2>Bem vindo ao Sistema Agillitas de Gestão.</h2>
      <Form />
    </Container>
  );
}
