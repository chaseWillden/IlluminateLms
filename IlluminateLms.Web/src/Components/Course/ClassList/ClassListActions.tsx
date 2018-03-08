import * as React from 'react'
import { DropDownButton, DropDownItem } from '../../../Containers/DropDown';

const ClassListActions = (props: any) => (
  <DropDownButton text='Actions' className='margin-left-btn'>
    <DropDownItem text='Set Dates' icon='calendar' onClick={() => {}} />
    <DropDownItem text='Inactivate' icon='calendar' onClick={() => {}} />
    <DropDownItem text='Deactivate' icon='calendar' onClick={() => {}} />
  </DropDownButton>
)

export default ClassListActions;