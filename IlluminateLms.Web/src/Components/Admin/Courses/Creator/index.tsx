import * as React from 'react'
import { CourseState } from "./CourseState";
import { connect } from 'react-redux';
import { Course } from '../../../../Models/index';
import { CreateCourse } from '../../../../Actions';
import { Form, Input } from '../../../../Containers/Form';
import { Button } from '../../../../Containers/Button';
import { withRouter } from 'react-router';

class CourseCreatorContainer extends React.Component<any, CourseState> {

  state: any = {
    name: 'Introduction to Business',
    courseCode: 'B 101',
    account: { accountId: 1 },
    rootAccount: { accountId: 1 },
    description: 'This course is an introduction to the business processes and everything else.'
  };

  componentWillReceiveProps(nextProps: any){
    let course: Course = nextProps.course;
    if (course.courseId > 0){
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

    const {createCourse} = this.props;

    return (
      <div className='uk-container'>
        <h1>Course Creator</h1>
        <Form>
          <div data-uk-grid>
            <Input 
              divClass='uk-width-1-3@m' 
              label='Name' 
              onChange={this.fieldUpdate.bind(this, 'name')}
              value={this.state.name}
              placeholder='Introduction to Business' />
          </div>
          <div data-uk-grid>
            <Input 
              divClass='uk-width-1-3@m' 
              label='Course Code' 
              onChange={this.fieldUpdate.bind(this, 'courseCode')}
              value={this.state.courseCode}
              placeholder='B 101' />
          </div>
          <div data-uk-grid>
            <Input
              divClass='uk-width-1-3@m'
              label='Course Description'
              onChange={this.fieldUpdate.bind(this, 'description')}
              value={this.state.description}
              textarea={true}
              placeholder='This course...' />
          </div>
          <div data-uk-grid>
            <div className="uk-width-1-3@m">
              <Button onClick={createCourse.bind(this, this.state)} text='Create Course' type='primary' />
            </div>
          </div>
        </Form>
      </div>
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