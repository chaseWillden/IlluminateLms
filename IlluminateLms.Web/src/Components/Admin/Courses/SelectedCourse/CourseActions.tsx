import * as React from 'react'
import { connect } from 'react-redux';
import {
  GetCourseById,
  ArchiveCourse,
  CreateCourseBookmark,
  GetBookmarkByCourseId,
  RemoveCourseBookmark
} from '../../../../Actions';
import { BookmarkedCourse, Course } from '../../../../Models/index';
import { containsPermissionInRoles } from '../../../../Helpers/PermissionHelper';
import {
  ListItemIcon,
  MenuItem,
  ListItemText,
  ListSubheader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from 'material-ui'
import {
  List,
  Add,
  Public,
  Bookmark,
  Publish,
  ContentCopy,
  Delete
} from 'material-ui-icons'

class CourseActionsContainer extends React.Component<any, any>{

  state = {
    gotBookmark: false,
    dialogOpened: false
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

  /**
   * Archive course
   */
  archive(actually: boolean){
    if (actually) this.props.archiveCourse(this.props.selectedCourse.courseId);
    console.log('here');
    this.setState({dialogOpened: false});
  }

  render() {
    let course: Course = this.props.selectedCourse;
    let bookmark: BookmarkedCourse = this.props.bookmarkedCourse;
    return (
      <div>
        <ListSubheader>Enrollments</ListSubheader>
        <MenuItem>
          <ListItemIcon><List /></ListItemIcon>
          <ListItemText inset primary='View Enrollments' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><Add /></ListItemIcon>
          <ListItemText inset primary='Add an Enrollment' />
        </MenuItem>

        <ListSubheader>Global</ListSubheader>
        <MenuItem>
          <ListItemIcon><Public /></ListItemIcon>
          <ListItemText inset primary='Make Public' />
        </MenuItem>
        <MenuItem onClick={() => {
          if (!bookmark.course || bookmark.course.bookmarkedCourseId === course.courseId) {
            this.props.removeBookmarkedCourse(course.courseId);
          }
          else {
            this.props.createBookmarkedCourse({
              course: course
            });
          }
        }}>
          <ListItemIcon><Bookmark /></ListItemIcon>
          <ListItemText inset primary={!bookmark.course || bookmark.course.courseId === course.courseId ? 'Remove Bookmark' : 'Create Bookmark'} />
        </MenuItem>
        <ListSubheader>Global</ListSubheader>
        <MenuItem>
          <ListItemIcon><Publish /></ListItemIcon>
          <ListItemText inset primary='Publish the course' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon><ContentCopy /></ListItemIcon>
          <ListItemText inset primary='Copy the course' />
        </MenuItem>
        <MenuItem onClick={() => this.setState({ dialogOpened: true })}>
          <ListItemIcon><Delete /></ListItemIcon>
          <ListItemText inset primary='Delete the course' />
        </MenuItem>
        <Dialog
          open={this.state.dialogOpened}
          onClose={() => this.setState({ dialogOpened: false })}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-description" >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure that you want to delete this course?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={this.archive.bind(this, true)}>Yes</Button>
            <Button onClick={this.archive.bind(this, false)}>No</Button>
          </DialogActions>
        </Dialog>
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