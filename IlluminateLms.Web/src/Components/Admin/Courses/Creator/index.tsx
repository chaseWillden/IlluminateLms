import * as React from 'react'
import { CourseState } from "./CourseState";
import { connect } from 'react-redux';
import { Course } from '../../../../Models/index';
import { CreateCourse } from '../../../../Actions';
import { withRouter } from 'react-router';
import { TextField, Grid, Button } from 'material-ui'
import {H3} from '../../../../Containers/Headers';

class CourseCreatorContainer extends React.Component<any, CourseState> {

  state: any = {
    name: 'Introduction to Business',
    courseCode: 'B 101',
    account: { accountId: 1 },
    rootAccount: { accountId: 1 },
    description: 'This course is an introduction to the business processes and everything else.'
  };

  componentWillReceiveProps(nextProps: any) {
    let course: Course = nextProps.course;
    if (course.courseId > 0) {
      this.props.history.push('/selected/' + course.courseId);
    }
  }

  /**
   * Update a field
   * @param {string} name
   * @param e
   */
  fieldUpdate(name: string, e: any) {
    let o: any = {};
    o[name] = e.target.value;
    this.setState(o);
  }

  render() {

    const { createCourse } = this.props;

    return (
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <H3>Course Creator</H3>
          <Grid container>
            <Grid item xs={5}>
              <form noValidate autoComplete="off">
                <TextField
                  label="Name"
                  value={this.state.name}
                  onChange={this.fieldUpdate.bind(this, 'name')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Course Code"
                  value={this.state.courseCode}
                  onChange={this.fieldUpdate.bind(this, 'courseCode')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Course Description"
                  value={this.state.description}
                  onChange={this.fieldUpdate.bind(this, 'description')}
                  margin="normal"
                  fullWidth
                  multiline
                />
              </form>
              <br/>
              <Button variant="raised" onClick={createCourse.bind(this, this.state)} color='primary'>Create Course</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state: any) => ({
  course: state.course
});

const mapDispatchToProps = (dispatch: any) => ({
  createCourse: (course: Course) => dispatch(CreateCourse(course))
});

const CourseCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseCreatorContainer);

export default withRouter(CourseCreator as React.ComponentClass<any>);