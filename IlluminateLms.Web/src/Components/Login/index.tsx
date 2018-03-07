import * as React from 'react'
import { FormEvent } from "react";
import { AuthService } from "../../Services";
require('./style.css');

export default class Login extends React.Component<any, any>{

  state = {
    username: 'admin@illuminatelms.com',
    password: 'PassWord1',
    fail: false,
    loading: false
  };

  async onSubmit(e: FormEvent<any>) {
    e.preventDefault();
    this.setState({ loading: true });
    const { username, password } = this.state;
    try {
      await AuthService.Login(username, password);
      this.setState({ loading: false });
      window.location.reload();
    }
    catch (e) {
      this.setState({ fail: true, loading: false });
    }
  }

  render() {
    const fail = <div className='uk-text-danger'>Invalid username or password</div>
    return (
      <div className="uk-flex-center" data-uk-grid>
        <div className="uk-flex-first">
          <img src='/Images/logo.png' alt='Logo' className='login-logo' />
          <div className="uk-card uk-card-default uk-card-body login-container uk-margin">
            <h3 className="uk-card-title">Login</h3>
            {this.state.fail ? fail : ''}
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="uk-inline block">
                <span className="uk-form-icon" data-uk-icon="icon: user" />
                <input className="uk-input" placeholder="Username" type="email" autoFocus={true} value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
              </div>
              <br />
              <div className="uk-inline block">
                <span className="uk-form-icon" data-uk-icon="icon: lock" />
                <input className="uk-input" placeholder="Password" type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
              </div>
              <br />
              <div className='uk-flex-right' data-uk-grid>
                <div className='uk-flex-first'>
                  <button onClick={this.onSubmit.bind(this)} className="uk-button uk-button-primary" disabled={this.state.loading}>Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
};