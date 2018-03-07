import * as React from 'react'
import { 
  DROPDOWN_HEADER, 
  DROPDOWN_NAVIGATION, 
  DROPDOWN_ACTION
} from './';
import { Header, Divider } from '../Navigation';
import { DropdownItemProps, DropdownProps } from './'
import {NavigationHistory} from '../Navigation';
import { DropDownItem } from '../DropDown';

const DropdownItem = (props: DropdownItemProps) => {
  if (props.type === DROPDOWN_HEADER) {
    return (
      <div>
        <Header name={props.title} />
        <Divider />
      </div>
    )
  }
  
  if (props.type === DROPDOWN_NAVIGATION){
    return (
      <NavigationHistory icon={props.icon} name={props.title} route={props.route || ''} />
    )
  }

  if (props.type === DROPDOWN_ACTION){
    return (
      <DropDownItem onClick={props.action} icon={props.icon} text={props.title} />
    )
  }

  return <span />;
}

export const MenuDropdown = (props: DropdownProps) => (
  <div className="uk-navbar-dropdown">
    <ul className="uk-nav uk-navbar-dropdown-nav">
      {props.items.map((item: DropdownItemProps) => (
        <DropdownItem 
          key={item.title} 
          title={item.title}
          action={item.action}
          icon={item.icon}
          route={item.route}
          type={item.type} />
      ))}
    </ul>
  </div>
)