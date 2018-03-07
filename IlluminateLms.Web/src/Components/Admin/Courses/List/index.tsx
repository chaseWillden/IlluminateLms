import * as React from 'react';
import { ListCoursesByAccountId } from '../../../../Actions';
import { connect } from 'react-redux';
import { Course } from '../../../../Models';
import { NavLink } from 'react-router-dom';

class CourseListContainer extends React.Component<any, any>{

  state : any = {
    q: ''
  }

  componentWillMount(){
    this.props.listCoursesByAccountId(1);
  }

  /**
   * Search change
   * @param e 
   */
  searchChange(e: any){
    this.setState({q: e.target.value});
  }

  /**
   * Filter courses
   */
  filterCourses(){
    let q = this.state.q.toLowerCase();
    let courses : Course[] = this.props.courses;
    return courses.filter(x => 
      x.name.toLowerCase().indexOf(q) > -1 || 
      x.courseCode.toLowerCase().indexOf(q) > -1
    ).sort((a: Course, b: Course) => a.courseCode > b.courseCode ? 1 : -1);
  }
  
  render(){
    const courses = this.filterCourses();
    const {q} = this.state;

    return (
      <div className='uk-container'>
        <h1>Course List</h1>
        <div className="uk-margin">
            <input className="uk-input" type="text" placeholder="Search..." autoFocus value={q} onChange={this.searchChange.bind(this)} />
        </div>
        <ul className="uk-list uk-list-divider">
          {courses.map((course: Course) => (
            <li key={course.courseId}>
              <NavLink to={'/selected/' + course.courseId}>
                <span>{course.courseCode} - {course.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  courses: state.courses
});

const mapDispatchToProps = (dispatch: any) => ({
  listCoursesByAccountId: (accountId: number) => dispatch(ListCoursesByAccountId(accountId))
});

const CourseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseListContainer);

export default CourseList;