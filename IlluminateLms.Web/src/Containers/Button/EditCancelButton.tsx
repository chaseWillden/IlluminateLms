import * as React from 'react'
import { Button } from './';
import { EditCancelButtonProps } from '../Props';

export const EditCancelButton = (props: EditCancelButtonProps) => (
  <div className='uk-inline'>
    <Button
      type={props.edit ? 'primary' : 'default'}
      onClick={props.onSave}
      text={props.edit ? 'Save' : 'Edit'}
      icon={props.edit ? 'upload' : 'pencil'}
    />
    <Button onClick={props.onCancel} text='Cancel' show={props.edit} icon='close' className='btn-margin-left' />
  </div>
)