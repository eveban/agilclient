import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Panel } from './styles';

const schema = Yup.object().shape({
  username: Yup.string().required('Nome é obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  // const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ username, password }) {
    dispatch(signInRequest(username, password));
  }
  return (
    <Panel>
      <Container>
        <img src={logo} alt="agil" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="username" placeholder="Nome de usuário" />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />
          <button type="submit">Acessar</button>
          <Link to="/register">Criar conta gratuita</Link>
        </Form>
      </Container>
    </Panel>
  );
}
