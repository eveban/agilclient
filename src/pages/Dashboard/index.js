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
      <h1>Dashboard</h1>
      <Form>
        <button type="button" onClick={handleSignOut}>
          Sair do GoBarber
        </button>
      </Form>
    </Container>
  );
}
