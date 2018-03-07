import * as React from 'react'
import { FieldSetProps } from '../Props';

export const FieldSet = (props: FieldSetProps) => (
  <fieldset className='uk-fieldset'>
    <legend className="uk-legend">{props.title}</legend>
    {props.children}
  </fieldset>
)