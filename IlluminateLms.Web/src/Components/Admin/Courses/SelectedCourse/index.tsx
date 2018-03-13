import * as React from 'react'
import { Course } from '../../../../Models';
import { connect } from 'react-redux';
import { 
  GetCourseById, 
  UpdateCourse 
} from '../../../../Actions';
import CourseActions from './CourseActions';
import {SelectedCourseContainerState} from './States'
import { 
  Button, 
  withStyles, 
  Menu, 
  Grid 
} from 'material-ui';
import {Edit, Launch, ArrowDropDown, Save, Cancel} from 'material-ui-icons';
import { H4 } from '../../../../Containers/Headers';
import { DetailedItem } from './Contants';
import { Input } from '../../../../Containers/Input';

const _aboutTheCourse = [
  {title: 'Course Code', name: 'courseCode', type: 'string'},
  {title: 'Course Name', name: 'name', type: 'string'},
  {title: 'Description', name: 'description', type: 'string'},
  {title: 'Is Archived', name: 'isArchived', type: 'boolean'},
  {title: 'Is Public', name: 'isPublic', type: 'boolean'},
  {title: 'Public Syllabus', name: 'publicSyllabus', type: 'boolean'},
  {title: 'Start Date', name: 'start', type: 'date'},
  {title: 'End Date', name: 'end', type: 'date'}
];

const styles = (theme: any) => ({
  button: {
    margin: 0
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
})

class SelectedCourseContainer extends React.Component<any, SelectedCourseContainerState>{

  state : SelectedCourseContainerState = {
    editNames: false,
    course: {} as Course,
    anchor: null
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

  render() {
    const course: Course = this.state.course;
    const {leftIcon, button} = this.props.classes;
    let cancel = <span />;

    if (this.state.editNames){
      cancel = (
        <Button color='secondary' className={button} onClick={() => this.setState({editNames: false})}>
          <Cancel className={leftIcon} /> Cancel
        </Button>
      )
    }

    return (
      <div className='uk-container'>
        <h1 className={this.props.archived ? 'strike' : ''}>
          <div className="uk-width-auto uk-inline uk-avatar-person">
            <img className="uk-border-circle" width="80" height="80" src="https://getuikit.com/docs/images/avatar.jpg" />
          </div>
          {course.courseCode} - {course.name}
        </h1>
        <div>        
          <Button className={button} onClick={() => {
            if (this.state.editNames){
              this.save();
            }
            this.setState({editNames: !this.state.editNames});
          }}>
            {this.state.editNames ?  <Save className={leftIcon} /> : <Edit className={leftIcon} />}
            {this.state.editNames ? 'Save' : 'Edit'}
          </Button>
          {cancel}
          <Button 
            className={button} 
            aria-owns='selectedCourseActions' 
            aria-haspopup="true" 
            onClick={(e: any) => this.setState({anchor: e.currentTarget})}>
            <ArrowDropDown className={leftIcon} /> Actions
          </Button>
          <Menu 
            id='selectedCourseActions' 
            anchorEl={this.state.anchor} 
            open={Boolean(this.state.anchor)} 
            onClose={() => this.setState({anchor: null})}>
            <CourseActions />
          </Menu>
          <Button color='primary' className={button}>
            <Launch className={leftIcon} /> Launch Course
          </Button>
        </div>
        <Grid container>
          <Grid item xs={6}>
            <H4>About the Course</H4>
            {_aboutTheCourse.map((about: any) => {
              return this.state.editNames ? (
                <Input
                  id={about.title}
                  label={about.title}
                  value={course[about.name]}
                  onChange={this.saveField.bind(this, about.name)}
                  key={about.name}
                  fullWidth
                  type={about.type}
                />
              ) : (
                <DetailedItem key={about.name} course={course} about={about} />
              )
            })}
          </Grid>
        </Grid>
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
)(withStyles(styles)(SelectedCourseContainer));

export default SelectedCourse;