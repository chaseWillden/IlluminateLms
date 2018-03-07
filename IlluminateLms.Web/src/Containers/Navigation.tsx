import * as React from 'react'
import {
  NavigationHeaderProps, 
  NavigationHistoryProps, 
  NavigationLinkProps
} from './Props'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

export const Header = (props: NavigationHeaderProps) => <li className="uk-nav-header">{props.name}</li>
export const Divider = () => <li className="uk-nav-divider"/>

export const NavigationHistory = withRouter<NavigationHistoryProps>(({history, name, route, icon}) => (
  <li onClick={() => history.push(route)}>
    <a>
      <span data-uk-icon={icon ? ("icon: " + icon) : ''} />
      {name}
    </a>
  </li>
))

export const NavigationLink = withRouter<NavigationLinkProps>(({location, route, children}) => (
  <li className={location.pathname === route ? "uk-active" : ""}>
    <NavLink to={route}>{children}</NavLink>
  </li>
))