import { CourseService } from "../Services";
import { Course } from "../Models";
import { 
  CREATE_COURSE, 
  LIST_COURSES, 
  SELECTED_COURSE, 
  SEARCH_COURSES,
  ARCHIVE_COURSE
} from "../Constants/ActionTypes";

/**
 * Create course success
 * @param course 
 */
const CreateCourseSuccess = (course: Course) => ({
  type: CREATE_COURSE,
  course
});

/**
 * Create a course
 * @param course 
 */
export const CreateCourse = (course: Course) => (dispatch: any) => {
  return CourseService.CreateCourse(course)
    .then(course => dispatch(CreateCourseSuccess(course)))
    .catch(err => {
      throw err;
    });
}

/**
 * List courses success
 * @param courses 
 */
const ListCourseSuccess = (courses: Course[]) => ({
  type: LIST_COURSES,
  courses
});

/**
 * List courses by account id
 * @param accountId 
 */
export const ListCoursesByAccountId = (accountId: number) => (dispatch: any) => {
  return CourseService.GetCoursesByAccountId(accountId)
    .then(courses => dispatch(ListCourseSuccess(courses)))
    .catch(err => {
      throw err;
    })
}

/**
 * Get course by id success
 * @param selectedCourse 
 */
const GetCourseByIdSuccess = (selectedCourse: Course) => ({
  type: SELECTED_COURSE,
  selectedCourse
})

/**
* Get course by id
* @param courseId
*/
export const GetCourseById = (courseId: number) => (dispatch: any) => {
  return CourseService.GetCourseById(courseId)
      .then(course => dispatch(GetCourseByIdSuccess(course)))
      .catch(err => {
          throw err;
      })
}

/**
 * Search courses
 * @param courses 
 */
const SearchCoursesSuccess = (courses: Course[]) => ({
  type: SEARCH_COURSES,
  courses
});

/**
 * Search courses
 * @param q 
 */
export const SearchCourses = (q: string) => (dispatch: any) => {
  return CourseService.FindCourse(q)
    .then(courses => dispatch(SearchCoursesSuccess(courses)))
    .catch(err => {
      throw err;
    })
}

/**
 * Archive course success
 * @param selectedCourse 
 */
const ArchiveCourseSuccess = (archived: boolean) => ({
  type: ARCHIVE_COURSE,
  archived
});

/**
 * Archive course
 * @param courseId 
 */
export const ArchiveCourse = (courseId: number) => (dispatch: any) => {
  return CourseService.ArchiveCourse(courseId)
    .then(archived => dispatch(ArchiveCourseSuccess(archived)))
    .catch(err => {
      throw err;
    })
}

/**
 * Update course
 * @param selectedCourse
 */
const UpdateCourseSuccess = (selectedCourse: Course) => ({
  type: SELECTED_COURSE,
  selectedCourse
});

/**
 * Update course
 * @param course 
 */
export const UpdateCourse = (course: Course) => (dispatch: any) => {
  return CourseService.UpdateCourse(course)
    .then(results => dispatch(UpdateCourseSuccess(results)))
    .catch(err => {
      throw err;
    })
}