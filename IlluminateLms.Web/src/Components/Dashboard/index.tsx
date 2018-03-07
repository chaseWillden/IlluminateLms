import * as React from 'react'
import { connect } from 'react-redux';
import { ListCourseBookmarks } from '../../Actions';
import { BookmarkedCourse } from '../../Models';
import { NavLink } from 'react-router-dom';
require('./style.scss');

class DashboardContainer extends React.Component<any, any>{

  componentWillMount() {
    this.props.getBookmarks();
  }

  render() {
    return (
      <div className='dashboard'>
        <h3>Bookmarked Courses</h3>
        <div className="uk-child-width-1-5" data-uk-grid>
          {this.props.bookmarkedCourses.map((bookmark: BookmarkedCourse) => (
            <div key={bookmark.bookmarkedCourseId}>
              <div className="uk-card uk-card-default uk-card-hover">
                <div className="uk-card-header">
                  <h3 className="uk-card-title">{bookmark.course.courseCode}</h3>
                  <p className='uk-text-meta uk-margin-remove-top'>{bookmark.course.name}</p>
                </div>
                <div className='uk-card-body'>
                  <p>{bookmark.course.description}</p>
                </div>
                <div className="uk-card-footer">
                  <NavLink to={'/courses/selected/' + bookmark.course.courseId} className="uk-button uk-button-text">Open</NavLink>
                  &nbsp;|&nbsp;
                  <NavLink to={'/course/' + bookmark.course.courseId} className="uk-button uk-button-text">Launch</NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  bookmarkedCourses: state.bookmarkedCourses
});

const mapDispatchToProps = (dispatch: any) => ({
  getBookmarks: () => dispatch(ListCourseBookmarks())
});

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

export default Dashboard;