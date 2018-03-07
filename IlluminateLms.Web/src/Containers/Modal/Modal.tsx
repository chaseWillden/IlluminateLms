import * as React from 'react'
import { ModalProps } from '../Props';
require('../style.scss');

export const Modal = (props: ModalProps) => (
  <div data-uk-modal id={props.id}>
    <div className="uk-modal-dialog uk-modal-body">
      <h2 className="uk-modal-title">{props.title}</h2>
      {props.children}
      <p className="uk-text-right">
        {props.buttons}
      </p>
    </div>
  </div>
)