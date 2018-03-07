import * as React from 'react'
import Logo from './Logo';
import Search from './Search'
import Admin from './Admin';
import Profile from './Profile';
import { NavigationHistory } from '../../Containers/Navigation';
require('./style.css');

const AppBar = () => (
  <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
    <nav className="uk-navbar-container" data-uk-navbar>
      <Logo />
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <NavigationHistory name='Dashboard' route='/' />
          <Admin />
        </ul>
      </div>
      <div className='uk-navbar-center'>
        <Search />
      </div>
      <Profile />
    </nav>
  </div>
)

export default AppBar;