import {
  Course,
  Account
} from '../Models'
import {
    CREATE_COURSE, 
    LIST_COURSES, 
    SELECTED_COURSE,
    SEARCH_COURSES,
    ARCHIVE_COURSE
} from '../Constants/ActionTypes'

const initialState : Course = {
     account: {accountId: 1} as Account,
     courseCode: '',
     courseId: -1,
     end: new Date(),
     isArchived: false,
     isPublic: false,
     isPublicToAuthUsers: true,
     name: '',
     parentCourse: null,
     publicSyllabus: false,
     rootAccount: {accountId: 1} as Account,
     start: new Date(),
     timeZone: 'America/Denver',
     description: ''
}

export const course = (state: Course = initialState, action: any) => {
    switch (action.type){
        case CREATE_COURSE:
            return action.course;
        default: 
            return state;
    }
}

export const courses = (state: Course[] = [], action: any) => {
    switch (action.type){
        case LIST_COURSES:
        case SEARCH_COURSES:
            return action.courses;
        default: 
            return state;
    }
}

export const selectedCourse = (state: Course = initialState, action: any) => {
    switch (action.type){
        case SELECTED_COURSE:
            return action.selectedCourse;
        default:
            return state;
    }
}

export const archivedCourse = (state: boolean = false, action: any) => {
    switch (action.type){
        case ARCHIVE_COURSE:
            return action.archived;
        default: 
            return state;
    }
}