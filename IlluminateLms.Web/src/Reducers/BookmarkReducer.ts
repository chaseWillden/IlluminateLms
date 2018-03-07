import { 
  BookmarkedCourse, 
  Course, 
  User 
} from "../Models/index";
import { 
  CREATE_BOOKMARKED_COURSE,
  LIST_BOOKMARKED_COURSES,
  GOT_BOOKMARKED_COURSE,
  REMOVED_BOOKMARK
} from "../Constants/ActionTypes";

let initialState : BookmarkedCourse = {
  course: {} as Course,
  user: {} as User,
  bookmarkedCourseId: -1
}


export const bookmarkedCourse = (state: BookmarkedCourse = initialState, action: any) => {
  switch (action.type){
      case CREATE_BOOKMARKED_COURSE:
      case GOT_BOOKMARKED_COURSE:
          return action.bookmarkedCourse;
      default: 
          return state;
  }
}

export const bookmarkedCourses = (state: BookmarkedCourse[] = [], action: any) => {
  switch (action.type){
    case LIST_BOOKMARKED_COURSES:
      return action.bookmarkedCourses;
    default:
      return state;
  }
}

export const removedBookmark = (state: boolean = false, action: any) => {
  switch (action.type){
    case REMOVED_BOOKMARK:
      return action.removedBookmark;
    default:
      return state;
  }
}