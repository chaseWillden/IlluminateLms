import * as React from 'react'
import { NavLink } from 'react-router-dom';

const Link = (props: any) => (
  <NavLink to={'/selected/' + props.course.courseId}>
    <span>{props.course.courseCode} - {props.course.name}</span>
  </NavLink>
)

export default Link;