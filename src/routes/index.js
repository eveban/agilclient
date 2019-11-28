import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Perfil';
import EmptyPage from '../pages/EmptyPage';
import FormDemo from '../pages/FormDemo';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/perfil" component={Perfil} isPrivate />
      <Route path="/empty" component={EmptyPage} isPrivate />
      <Route path="/forms" component={FormDemo} isPrivate />
    </Switch>
  );
}
