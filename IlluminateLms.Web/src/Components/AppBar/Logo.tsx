import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router';

const Logo = withRouter<RouteComponentProps<any>>(({history}) => (
  <div className='uk-navbar-left logo-container' onClick={() => history.push('/')}>
    <a className="uk-navbar-item uk-logo" href="/">
      <img src="/Images/Logo.png" alt="Illuminate Lms Logo" className='logo' />
      Illuminate Lms
    </a>
  </div>
));

export default Logo;