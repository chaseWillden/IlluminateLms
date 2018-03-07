import * as React from 'react'
import { SelectProps, OptionProps } from '../Props';

export const Select = (props: SelectProps) => (
  <select value={props.value} onChange={(e: any) => props.onChange(e.target.value)} className='uk-select'>
    <option value='-1'>Select One</option>
    {props.options.map((val: OptionProps) => (
      <option key={val.value} value={val.value}>{val.title}</option>
    ))}
  </select>
)