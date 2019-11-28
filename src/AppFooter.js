import React, { Component } from 'react';

import logo from './assets/logo.png';

export class AppFooter extends Component {
  render() {
    return (
      <div className="layout-footer clearfix">
        <a href="/">
          <img alt="logo-colored" src={logo} />
        </a>
        <span className="footer-text-right">
          <span className="material-icons">copyright</span>
          <span>Todos os direitos reservados</span>
        </span>
      </div>
    );
  }
}
