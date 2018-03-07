import * as React from 'react'
import { Route } from 'react-router';
import Dashboard from './Components/Dashboard'
import Courses from './Components/Admin/Courses';
import People from './Components/Admin/People'
import Course from './Components/Course'
import Profile from './Components/Profile';
import Roles from './Components/Admin/Roles';

const Routes = () => (
    <div>
        <Route exact path='/' component={Dashboard} />
        <Route path='/courses' component={Courses} />
        <Route path='/people' component={People} />
        <Route path='/course/:id' component={Course} />
        <Route path='/profile' component={Profile} />
        <Route path='/roles' component={Roles} />
    </div>
);

export default Routes;