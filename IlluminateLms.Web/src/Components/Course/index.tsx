import * as React from 'react'
import Page from '../../Containers/Page';
import Dashboard from './Dashboard'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { GetCourseById } from '../../Actions';
import { Course as CourseModal } from '../../Models';
import ClassList from './ClassList'
import Settings from './Settings'
import Content from './Content';
import ContentSettings from './ContentSettings';

const navLinks : any = [
  {route: '/', text: 'Dashboard'},
  {route: '/classlist', text: 'Class List'},
  {route: '/content', text: 'Content'},
  {route: '/settings', text: 'Settings'}
];

const routes : any = [
  {component: Dashboard, path: '/', exact: true},
  {component: ClassList, path: '/classlist'},
  {component: ContentSettings, path: '/content/:contentItemId/settings'},
  {component: Content, path: '/content', exact: true},
  {component: Settings, path: '/settings'}
];

class CourseContainer extends React.Component<any, any>{

  componentWillMount(){
    const {match, getCourseById} = this.props;
    const courseId : number = match.params['id'];
    getCourseById(courseId);
  }

  render(){
    const match = this.props.match;
    const course: CourseModal = this.props.selectedCourse;

    return (
      <Page 
        baseRoute={'course/' + match.params['id']}
        description={course.description}
        navigationLinks={navLinks}
        routes={routes}
        title={course.courseCode + ' - ' + course.name}
        bgImage='/Images/Courses.jpg'
      />
    )
  }
}

const mapStateToProps = (state: any) => ({
  selectedCourse: state.selectedCourse
});

const mapDispatchToProps = (dispatch: any) => ({
  getCourseById: (courseId: number) => dispatch(GetCourseById(courseId))
});

const Course = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseContainer);

export default withRouter(Course as React.ComponentType<any>);