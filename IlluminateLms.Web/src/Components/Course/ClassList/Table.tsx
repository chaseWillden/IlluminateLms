import * as React from 'react'
import { Enrollment } from '../../../Models/index';
import FormField from '../../../Containers/Form/FormField';
import { ClassListTableProps } from './props'

const Table = (props: ClassListTableProps) => (
  <table className="uk-table uk-table-striped">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Name</th>
        <th>Email</th>
        <th>Is Active</th>
      </tr>
    </thead>
    <tbody>
      {props.enrollments.map((enrollment: Enrollment) => (
        <tr key={enrollment.enrollmentId}>
          <td>
            <FormField 
              title=''
              data={!!props.selected[enrollment.enrollmentId]}
              edit={true}
              type='checkbox'
              onChange={props.selectRow.bind(props.parent, enrollment)}
            />
          </td>
          <td>{enrollment.user.sortableName}</td>
          <td>{enrollment.user.email}</td>
          <td>{enrollment.isActive ? 'Yes' : 'No'}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default Table;