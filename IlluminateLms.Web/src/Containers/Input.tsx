import * as React from 'react'
import {TextField, Checkbox, FormControlLabel} from 'material-ui'

export interface InputProps {
  id: string;
  label: string;
  value: any;
  onChange: Function;
  fullWidth: boolean;
  type: string;
}

export const Input = (props: InputProps) => {
  if (props.type === 'boolean'){
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={!!props.value}
            onChange={(e) => props.onChange(e.target.checked)}
            value={props.label}
            id={props.id}
          />
        }
        label={props.label}
      />
    )
  }
  return (
    <TextField
      id={props.id}
      label={props.label}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      margin="normal"
      fullWidth={props.fullWidth}
    />
  )
}