import * as React from 'react'
import { DropDownButtonGrid, DropDownItem } from '../../../../Containers/DropDown';
import { Header } from '../../../../Containers/Navigation';
import { connect } from 'react-redux';
import {
  GetCourseById,
  ArchiveCourse,
  CreateCourseBookmark,
  GetBookmarkByCourseId,
  RemoveCourseBookmark
} from '../../../../Actions';
import { ConfirmationModal } from '../../../../Containers/Modal';
import { BookmarkedCourse, Course } from '../../../../Models/index';
import { containsPermissionInRoles } from '../../../../Helpers/PermissionHelper';
import { DELETE_COURSE } from '../../../../Constants/Roles';

const deleteConfirmationText = 'Are you sure you want to delete this course?';

class CourseActionsContainer extends React.Component<any, any>{

  state = {
    gotBookmark: false
  }

  componentWillReceiveProps(nextProps: any) {
    let course: Course = nextProps.selectedCourse;
    if (!this.state.gotBookmark) {
      this.props.getBookmark(course.courseId);
      this.setState({ gotBookmark: true });
    }
  }

  /**
   * Shorthand for has permissions
   * @param value 
   */
  hasPermission(value: string) {
    return containsPermissionInRoles(this.props.roles, value);
  }

  render() {
    let course: Course = this.props.selectedCourse;
    let bookmark: BookmarkedCourse = this.props.bookmarkedCourse;
    return (
      <div className='uk-inline'>
        <DropDownButtonGrid text='Actions' className='btn-margin-left uk-width-large'>
          <div className="uk-dropdown-grid uk-child-width-1-2@m" data-uk-grid>
            <div>
              <ul className="uk-nav uk-dropdown-nav">
                <Header name='Enrollments' />
                <DropDownItem text='View enrollments' icon='users' onClick={() => { }} />
                <DropDownItem text='Add an enrollment' icon='plus' onClick={() => { }} />

                <Header name='Global' />
                <DropDownItem text='Make public' icon='world' onClick={() => { }} />
                <DropDownItem text={!bookmark.course || bookmark.course.courseId === course.courseId ? 'Remove Bookmark' : 'Create Bookmark'} icon='bookmark' onClick={() => {
                  if (!bookmark.course || bookmark.course.bookmarkedCourseId === course.courseId) {
                    this.props.removeBookmarkedCourse(course.courseId);
                  }
                  else {
                    this.props.createBookmarkedCourse({
                      course: course
                    });
                  }
                }} />
              </ul>
            </div>
            <div>
              <ul className='uk-nav uk-dropdown-nav'>
                <Header name='Administrative' />
                {!this.hasPermission(DELETE_COURSE) ? '' : <DropDownItem text='Delete the course' icon='trash' onClick={() => { }} data-uk-toggle="target: #confDialog" />}
                <DropDownItem text='Publish the course' icon='cloud-upload' onClick={() => { }} />
                <DropDownItem text='Copy the course' icon='copy' onClick={() => { }} />
              </ul>
            </div>
          </div>
        </DropDownButtonGrid>
        <ConfirmationModal
          id="confDialog"
          text={deleteConfirmationText}
          yesClicked={() => this.props.archiveCourse(this.props.selectedCourse.courseId)}>
          Are you sure that you want to delete this course?
        </ConfirmationModal>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  selectedCourse: state.selectedCourse,
  bookmarkedCourse: state.bookmarkedCourse,
  removedBookmark: state.removedBookmark,
  roles: state.currentUserRoles
});

const mapDispatchToProps = (dispatch: any) => ({
  getCourseById: (id: number) => dispatch(GetCourseById(id)),
  archiveCourse: (id: number) => dispatch(ArchiveCourse(id)),
  createBookmarkedCourse: (bookmark: BookmarkedCourse) => dispatch(CreateCourseBookmark(bookmark)),
  removeBookmarkedCourse: (courseId: number) => dispatch(RemoveCourseBookmark(courseId)),
  getBookmark: (courseId: number) => dispatch(GetBookmarkByCourseId(courseId))
});

const CourseActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseActionsContainer);

export default CourseActions;