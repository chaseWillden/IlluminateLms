import * as React from 'react'
import { DropDownItemProps, DropDownProps } from './Props';
import { NavLink } from 'react-router-dom';

export const DropDownItem = (props: DropDownItemProps) => (
  <li className={props.className} onClick={() => props.onClick ? props.onClick() : ''} data-uk-toggle={props['data-uk-toggle']}>
    <a href={props.href}>
      <span data-uk-icon={props.icon ? ("icon: " + props.icon) : ''} />
      {props.text}
    </a>
  </li>
);

export const DropDownNav = (props: DropDownItemProps) => (
  props.refresh ? (
    <li className={props.className} onClick={() => props.onClick ? props.onClick() : ''}>
      <a href={props.to ? props.to : ''} target={props.newtab ? '_blank' : ''}>
        <span data-uk-icon={props.icon ? ("icon: " + props.icon) : ''} />
        {props.text}
      </a>
    </li>
  ) : (
    <li className={props.className} onClick={() => props.onClick ? props.onClick() : ''}>
      <NavLink to={props.to ? props.to : ''}>
        <span data-uk-icon={props.icon ? ("icon: " + props.icon) : ''} />
        {props.text}
      </NavLink>
    </li>
  )
);

export const DropDownButton = (props: DropDownProps) => (
  <div className={'uk-inline ' + props.className}>
    <button className={"uk-button with-icon uk-button-" + (props.type ? props.type : 'default')} type="button">
      <span data-uk-icon='icon: triangle-down' />
      {props.text}
    </button>
    <div data-uk-dropdown='bottom-left'>
        <ul className="uk-nav uk-dropdown-nav">
            {props.children}
        </ul>
    </div>
  </div>
);

export const DropDownButtonGrid = (props: DropDownProps) => (
  <div className={'uk-inline ' + props.className}>
    <button className={"uk-button with-icon uk-button-" + (props.type ? props.type : 'default')} type="button">
      <span data-uk-icon='icon: triangle-down' />
      {props.text}
    </button>
    <div className='uk-width-large' data-uk-dropdown='bottom-left'>
      {props.children}
    </div>
  </div>
)