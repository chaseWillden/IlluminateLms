import * as React from 'react'
import PeopleCreator from './Creator'
import PeopleList from './List'
import SelectedUser from './SelectedUser'
import Page from '../../../Containers/Page';

const navLinks : any = [
  {route: '/list', text: 'People List'},
  {route: '/create', text: 'Add a Person'}
];

const routes : any = [
  {component: PeopleList, path: '/', exact: true},
  {component: PeopleList, path: '/list'},
  {component: PeopleCreator, path: '/create'},
  {component: SelectedUser, path: '/selected/:id'}
];

const People = () => (
  <Page 
    baseRoute='people'
    description='Use this page to create, find, publish, and remove courses. Enrollments can also happen here.'
    navigationLinks={navLinks}
    routes={routes}
    title='People'
    bgImage='/Images/Classroom.jpg'
  />
)

export default People;