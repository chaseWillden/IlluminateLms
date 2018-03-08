import * as React from 'react'
import { Button } from '../../../Containers/Button';
import { connect } from 'react-redux';
import {
  ListEnrollments,
  DeleteEnrollment,
  CreateEnrollment
} from '../../../Actions';
import { Enrollment, Course } from '../../../Models/index';
import FormField from '../../../Containers/Form/FormField';
import { UserServices } from '../../../Services/index';
import { Modal, ConfirmationModal } from '../../../Containers/Modal';
import Table from './Table';
import ClassListActions from './ClassListActions';
require('./style.scss');

class ClassListContainer extends React.Component<any, any>{

  state = {
    gotEnrollments: false,
    selected: {} as { [id: number]: Enrollment },
    userEmail: ''
  }

  componentWillMount() {
    if (this.props.selectedCourse.courseId > -1) this.getEnrollments(this.props.selectedCourse);
  }

  componentWillReceiveProps(nextProps: any) {
    if (!this.state.gotEnrollments ||
      nextProps.removedEnrollment ||
      nextProps.createdEnrollment.enrollmentId > -1) {
      this.getEnrollments(nextProps.selectedCourse);
    }
  }

  /**
   * Create enrollment
   */
  async createEnrollment() {
    var user = await UserServices.GetUserByEmail(this.state.userEmail);

    if (user == null) {
      UIkit.modal('#userErrorDialog').show();
      return;
    }

    let enrollment = {
      course: this.props.selectedCourse,
      user: user
    };
    this.props.createEnrollment(enrollment);
    this.props.getEnrollments(this.props.selectedCourse.courseId);
    this.setState({ userEmail: '' });
  }

  /**
   * Get enrollments
   * @param course 
   */
  getEnrollments(course: Course) {
    this.props.getEnrollments(course.courseId);
    this.setState({ gotEnrollments: true });
  }

  /**
   * Select row
   * @param idx 
   */
  selectRow(enrollment: Enrollment) {
    let selected = this.state.selected;
    if (selected[enrollment.enrollmentId]) delete selected[enrollment.enrollmentId];
    else selected[enrollment.enrollmentId] = enrollment;
    this.setState({ selected: selected });
  }

  /**
   * Remove enrollments
   */
  removeEnrollments() {
    for (let idx in this.state.selected) {
      let enrollment = this.state.selected[idx];
      this.props.removeEnrollment(enrollment.enrollmentId);
    }
  }

  render() {

    let actionButtons = [<span key='blank' />];
    if (Object.keys(this.state.selected).length > 0) {
      actionButtons = [
        <Button key='remove' text='Remove User(s)' show={true} icon='trash' type='danger' className='margin-left-btn' uktoggle='target: #deleteUserConf' />,
        <ClassListActions key='actions' />
      ];
    }

    return (
      <div className='uk-container'>
        <h1>Class List</h1>
        <div>
          <Button text='Enroll User' show={true} icon='user' type='primary' uktoggle="target: #createEnrollmentModal" />
          {actionButtons}
        </div>
        <Modal id='createEnrollmentModal' title="Let's Enroll a User" buttons={[
          <Button text='Cancel' className='uk-modal-close margin-right' key='cancel' icon='close' />,
          <Button text='Enroll' type='primary' className='uk-modal-close' key='save' icon='upload' onClick={this.createEnrollment.bind(this)} />
        ]}>
          <FormField
            focus={true}
            title='User Email'
            label={true}
            edit={true}
            data={this.state.userEmail}
            onChange={(val: string) => this.setState({ userEmail: val })}
            onEnter={this.createEnrollment.bind(this)} />
        </Modal>
        <Modal id='userErrorDialog' title='Unable to find user' buttons={[
          <Button text='Close' type='primary' className='uk-modal-close' key='Close' icon='close' />
        ]}>
          The user "{this.state.userEmail}" does not exist.
        </Modal>
        <ConfirmationModal
          text="Are you sure?"
          id='deleteUserConf'
          yesClicked={this.removeEnrollments.bind(this)}>
          Are you sure that you want to remove these users?
        </ConfirmationModal>
        <br />
        <div className='uk-card uk-card-body uk-card-default'>
          <Table
            enrollments={this.props.enrollments}
            selectRow={this.selectRow}
            selected={this.state.selected}
            parent={this} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  enrollments: state.enrollments,
  selectedCourse: state.selectedCourse,
  removedEnrollment: state.removedEnrollment,
  createdEnrollment: state.createdEnrollment
});

const mapDispatchToProps = (dispatch: any) => ({
  getEnrollments: (courseId: number) => dispatch(ListEnrollments(courseId)),
  removeEnrollment: (enrollmentId: number) => dispatch(DeleteEnrollment(enrollmentId)),
  createEnrollment: (enrollment: Enrollment) => dispatch(CreateEnrollment(enrollment))
});

const ClassList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassListContainer);

export default ClassList;