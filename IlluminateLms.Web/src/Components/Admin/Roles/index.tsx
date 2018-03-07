import * as React from 'react'
import Page from '../../../Containers/Page';
import RoleList from './RoleList'
import RoleCreator from './RoleCreator'
import SelectedRole from './SelectedRole'

const navLinks: any = [
  { route: '/list', text: 'Role List' },
  { route: '/create', text: 'Create a Role' },
];

const routes: any = [
  { component: RoleList, path: '/', exact: true },
  { component: RoleList, path: '/list' },
  { component: RoleCreator, path: '/create' },
  { component: SelectedRole, path: '/selected/:id' }
];

const Roles = () => (
  <Page
    baseRoute='roles'
    description='Use this page to create, find, publish, and remove roles.'
    navigationLinks={navLinks}
    routes={routes}
    title='Roles'
    bgImage='/Images/Jobs.jpg'
  />
)

export default Roles;