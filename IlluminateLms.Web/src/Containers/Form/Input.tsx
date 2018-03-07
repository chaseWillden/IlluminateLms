import * as React from 'react'
import { InputProps } from '../Props';

export const Input = (props: InputProps) => (
  <div className={props.divClass}>
    {props.label
      ? <label className="uk-form-label">{props.label}</label>
      : ''}
    {props.textarea
    ? (
      <textarea
        className="uk-textarea"
        placeholder={props.placeholder ? props.placeholder : ''}
        rows={5}
        value={props.value}
        onChange={(e: any) => props.onChange(e)}
        autoFocus={props.autoFocus}
      />
    ) : (
      <input
        className="uk-input"
        type={props.type ? props.type : 'text'}
        placeholder={props.placeholder ? props.placeholder : ''}
        value={props.value}
        onChange={(e: any) => props.onChange(e)}
        autoFocus={props.autoFocus}
      />
    )}
  </div>
)