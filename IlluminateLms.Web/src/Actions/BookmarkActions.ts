import {
  CREATE_BOOKMARKED_COURSE,
  LIST_BOOKMARKED_COURSES,
  GOT_BOOKMARKED_COURSE,
  REMOVED_BOOKMARK
} from "../Constants/ActionTypes";

import {BookmarkedCourse} from '../Models'
import {BookmarkService} from '../Services'

/**
 * Create bookmark success
 * @param bookmarkedCourse 
 */
const CreateCourseBookmarkSuccess = (bookmarkedCourse: BookmarkedCourse) => ({
  type: CREATE_BOOKMARKED_COURSE,
  bookmarkedCourse
});

/**
 * Create course bookmark
 * @param bookmark 
 */
export const CreateCourseBookmark = (bookmark: BookmarkedCourse) => (dispatch: any) => {
  return BookmarkService.CreateBookmark(bookmark)
    .then(bookmark => dispatch(CreateCourseBookmarkSuccess(bookmark)))
    .catch(err => {
      throw err;
    })
}

/**
 * List course bookmarks
 * @param bookmarkedCourses 
 */
const ListCourseBookmarksSuccess = (bookmarkedCourses: BookmarkedCourse[]) => ({
  type: LIST_BOOKMARKED_COURSES,
  bookmarkedCourses
});

/**
 * List course bookmarks
 */
export const ListCourseBookmarks = () => (dispatch: any) => {
  return BookmarkService.GetAllCourseBookmarks()
    .then(bookmarks => dispatch(ListCourseBookmarksSuccess(bookmarks)))
    .catch(err => {
      throw err;
    })
}

/**
 * Get bookmark by course id success
 * @param bookmarkedCourses 
 */
const GetBookmarkCourseByCourseIdSuccess = (bookmarkedCourse: BookmarkedCourse) => ({
  type: GOT_BOOKMARKED_COURSE,
  bookmarkedCourse
});

/**
 * Get bookmark by course id
 */
export const GetBookmarkByCourseId = (courseId: number) => (dispatch: any) => {
  return BookmarkService.GetBookmarkByCourseId(courseId)
    .then(bookmark => dispatch(GetBookmarkCourseByCourseIdSuccess(bookmark)))
    .catch(err => {
      throw err;
    })
}

/**
 * Remove course bookmark success
 * @param removedBookmark 
 */
const RemoveCourseBookmarkSuccess = (removedBookmark: boolean) => ({
  type: REMOVED_BOOKMARK,
  removedBookmark
});

/**
 * Remove course bookmark
 * @param courseId 
 */
export const RemoveCourseBookmark = (courseId: number) => (dispatch: any) => {
  return BookmarkService.RemoveCourseBookmark(courseId)
    .then(worked => dispatch(RemoveCourseBookmarkSuccess(worked)))
    .catch(err => {
      throw err;
    })
}