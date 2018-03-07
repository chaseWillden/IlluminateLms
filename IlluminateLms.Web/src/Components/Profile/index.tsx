import * as React from 'react'
import Page from '../../Containers/Page';
import Home from './Home';

const navLinks : any = [
  
];

const routes : any = [
  {component: Home, path: '/', exact: true}
];

const Profile = () => (
  <Page 
    baseRoute='profile'
    description='Here is your profile'
    navigationLinks={navLinks}
    routes={routes}
    title='Profile'
    bgImage='/Images/Classroom.jpg'
  />
)

export default Profile;