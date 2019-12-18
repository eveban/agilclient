import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import SignUp from '../pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Perfil from '../pages/Perfil';
import Rotas from '../pages/Rotas';
import RotaCity from '../components/RotaCity';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/perfil" component={Perfil} isPrivate />
      <Route path="/rotas" component={Rotas} isPrivate />
      <Route path="/RotaCity" component={RotaCity} isPrivate />
    </Switch>
  );
}
