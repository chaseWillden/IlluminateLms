import * as React from 'react';
import { DropDownButton, DropDownItem, DropDownNav } from '../../../../Containers/DropDown';
import { connect } from 'react-redux';

const LaunchCourseContainer = (props: any) => (
  <DropDownButton text='Launch Course' type='primary' className='btn-margin-left'>
    <DropDownItem text='As Student' icon='users' onClick={() => {}} />
    <DropDownItem text='As Teacher' icon='user' onClick={() => {}} />
    <DropDownNav to={'/course/' + props.selectedCourse.courseId} text='As You' icon='upload' refresh="yes" />
  </DropDownButton>
)

const mapStateToProps = (state: any) => ({
  selectedCourse: state.selectedCourse
});

const mapDispatchToProps = () => ({
  
});

const LaunchCourse = connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchCourseContainer);

export default LaunchCourse;