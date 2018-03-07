import * as React from 'react'
import CourseList from './List';
import CourseCreator from './Creator';
import Page from '../../../Containers/Page';
import SelectedCourse from './SelectedCourse';

const navLinks : any = [
  {route: '/list', text: 'Course List'},
  {route: '/create', text: 'Create a Course'},
];

const routes : any = [
  {component: CourseList, path: '/', exact: true},
  {component: CourseList, path: '/list'},
  {component: CourseCreator, path: '/create'},
  {component: SelectedCourse, path: '/selected/:id'}
];

const Courses = () => (
  <Page 
    baseRoute='courses'
    description='Use this page to create, find, publish, and remove courses. Enrollments can also happen here.'
    navigationLinks={navLinks}
    routes={routes}
    title='Courses'
    bgImage='/Images/Teach.jpg'
  />
)

export default Courses;