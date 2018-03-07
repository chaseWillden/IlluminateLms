import * as React from 'react'
import { FormProps } from '../Props';

export const Form = (props: FormProps) => (
  <form className='uk-form-stacked' onSubmit={(e) => props.onSubmit ? props.onSubmit(e) : e.preventDefault()}>
    {props.children}
  </form>
);