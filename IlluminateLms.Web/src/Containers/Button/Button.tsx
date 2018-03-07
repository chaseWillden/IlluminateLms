import * as React from 'react'
import { ButtonProps } from '../Props';

const Span = <span />

export const Button = (props: ButtonProps) => {
  if (typeof props.show === 'boolean' && !props.show) return Span;

  let classes = "uk-button uk-button-";
  if (props.type) classes += props.type;
  else classes += 'default';
  if (props.className) classes += ' ' + props.className;
  if (props.icon) classes += ' with-icon';

  let icon = props.icon ? <span data-uk-icon={"icon: " + props.icon} /> : '';
  return (
    <button onClick={() => props.onClick ? props.onClick() : ''} className={classes} data-uk-toggle={props.uktoggle}>
      {icon}
      {props.text}
    </button>
  )
}