import * as React from 'react'
import { NavLink } from 'react-router-dom';
import { Role } from '../../../../Models';

const RoleList = (props: any) => (
  <div>
    <legend className="uk-legend">Roles</legend>
    <ul className='uk-list'>
      {props.roles.map((role: Role) => (
        <li key={role.roleId}>
          <NavLink to={'/roles/selected/' + role.roleId}>{role.name}</NavLink>
        </li>
      ))}
    </ul>
  </div>
)

export default RoleList;