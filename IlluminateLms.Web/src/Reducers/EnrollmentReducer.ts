import { Enrollment, Course, User } from "../Models/index";
import { 
  CREATED_ENROLLMENT,
  LIST_ENROLLMENTS,
  REMOVED_ENROLLMENT
} from "../Constants/ActionTypes";

let initialState : Enrollment = {
  course: {} as Course,
  createdBy: {} as User,
  createdDate: new Date(),
  end: new Date(),
  enrollmentId: -1,
  isActive: true,
  isArchived: false,
  start: new Date(),
  timezone: 'America/Denver',
  user: {} as User
}


export const createdEnrollment = (state: Enrollment = initialState, action: any) => {
  switch (action.type){
      case CREATED_ENROLLMENT:
          return action.createdEnrollment;
      default: 
          return state;
  }
}

export const enrollments = (state: Enrollment[] = [], action: any) => {
  switch (action.type){
    case LIST_ENROLLMENTS:
      return action.enrollments;
    default:
      return state;
  }
}

export const removedEnrollment = (state: boolean = false, action: any) => {
  switch (action.type){
    case REMOVED_ENROLLMENT:
      return action.removedEnrollment;
    default:
      return state;
  }
}