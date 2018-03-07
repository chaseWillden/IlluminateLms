import * as React from 'react'
import { Course } from '../../../../Models';
import { connect } from 'react-redux';
import { 
  GetCourseById, 
  UpdateCourse 
} from '../../../../Actions';
import { EditCancelButton } from '../../../../Containers/Button';
import * as moment from 'moment';
import CourseActions from './CourseActions';
import LaunchCourse from './LaunchCourse';
import {SelectedCourseContainerState} from './States'
import FormField from '../../../../Containers/Form/FormField';

const _aboutTheCourse = [
  {title: 'Course Code', name: 'courseCode'},
  {title: 'Course Name', name: 'name'},
  {title: 'Description', name: 'description'},
  {title: 'Is Archived', name: 'isArchived'},
  {title: 'Is Public', name: 'isPublic'},
  {title: 'Public Syllabus', name: 'publicSyllabus'},
  {title: 'Start Date', name: 'start'},
  {title: 'End Date', name: 'end'}
];

class SelectedCourseContainer extends React.Component<any, SelectedCourseContainerState>{

  state : SelectedCourseContainerState = {
    editNames: false,
    course: {} as Course
  }

  componentWillMount() {
    let id = this.props.match.params['id'];
    this.props.getCourseById(id);
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({ course: nextProps.selectedCourse });
  }

  /**
   * Save changes
   */
  save() {
    if (this.state.editNames) {
      this.props.updateCourse(this.state.course);
    }
    this.setState({ editNames: !this.state.editNames, course: this.props.selectedCourse });
  }

  /**
   * Save field onChange event
   * @param name 
   * @param e 
   */
  saveField(name: string, val: any) {
    let course = this.state.course;
    course[name] = val;
    this.setState({course: course});
  }

  /**
   * Format date
   * @param date 
   */
  formatDate(date: Date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  render() {
    const course: Course = this.state.course;
    return (
      <div className='uk-container'>
        <h1 className={this.props.archived ? 'strike' : ''}>
          <div className="uk-width-auto uk-inline uk-avatar-person">
            <img className="uk-border-circle" width="80" height="80" src="https://getuikit.com/docs/images/avatar.jpg" />
          </div>
          {course.courseCode} - {course.name}
        </h1>
        <div className="uk-inline">
          <EditCancelButton 
            edit={this.state.editNames}
            onCancel={() => this.setState({editNames: false})}
            onSave={this.save.bind(this)} />
          <LaunchCourse />
          <CourseActions />
        </div>
        <div className='uk-child-width-expand@s uk-margin' data-uk-grid>
          <fieldset className='uk-fieldset'>
            <legend className="uk-legend">About the Course</legend>
            {_aboutTheCourse.map((about: any) => (
              <FormField 
                title={about.title}
                data={course[about.name]}
                edit={this.state.editNames} 
                key={about.name}
                onChange={this.saveField.bind(this, about.name)} />
            ))}
          </fieldset>
          <fieldset className='uk-fieldset'>
            <legend className="uk-legend">Course Ties</legend>
          </fieldset>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state: any) => ({
  selectedCourse: state.selectedCourse,
  archived: state.archived
});

const mapDispatchToProps = (dispatch: any) => ({
  getCourseById: (id: number) => dispatch(GetCourseById(id)),
  updateCourse: (course: Course) => dispatch(UpdateCourse(course))
});

const SelectedCourse = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedCourseContainer);

export default SelectedCourse;