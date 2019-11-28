import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default class Login extends Component {
  render() {
    return (
      <div className="login-body">
        <div className="login-panel p-fluid">
          <div className="login-panel-header">
            <img
              src="assets/layout/images/logo-slim.png"
              alt="serenity-react"
            />
          </div>
          <div className="login-panel-content">
            <div className="p-grid">
              <div className="p-col-12">
                <h1>Sign-in to Serenity Network</h1>
              </div>
              <div className="p-col-12">
                <span className="md-inputfield">
                  <InputText />
                  <label>Username</label>
                </span>
              </div>
              <div className="p-col-12">
                <span className="md-inputfield">
                  <InputText />
                  <label>Password</label>
                </span>
              </div>
              <div className="p-col-12">
                <Button
                  label="Sign In"
                  icon="pi-md-person"
                  onClick={() => {
                    window.location = '/';
                  }}
                />
              </div>
              <div className="p-col-12">
                Don't have an account? <a href="/">Sign Up</a> now.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
