import * as React from 'react'
import { 
  AreYourSureModalProps
} from '../Props';
import { Modal } from './Modal';
require('../style.scss');

const areYouSure = 'Are you sure?';

export const ConfirmationModal = (props: AreYourSureModalProps) => (
  <Modal
    id={props.id}
    title={areYouSure}
    buttons={[
      <button className="uk-button uk-button-default uk-modal-close margin-right" type="button" key='No'>No</button>,
      <button className="uk-button uk-button-danger uk-modal-close" type="button" onClick={props.yesClicked.bind(null)} key='Yes'>Yes</button>
    ]}>
    {props.children}
  </Modal>
)