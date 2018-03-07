import { combineReducers } from 'redux';
import {
    currentUser, 
    createdUser, 
    users,
    selectedUser,
    passwordUpdated
} from './UserReducer';
import {
    course, 
    courses, 
    selectedCourse,
    archivedCourse
} from './CourseReducer';
import { Reducer } from 'redux';
import { 
    bookmarkedCourse, 
    bookmarkedCourses ,
    removedBookmark
} from './BookmarkReducer';
import { 
    createdEnrollment,
    enrollments,
    removedEnrollment
} from './EnrollmentReducer';
import {
  roles,
  createdRole,
  selectedRole,
  currentUserRoles
} from './RoleReducer';
import {
  permissions,
  addedPermissions
} from './PermissionReducer';
import { 
  listContentItems, 
  createdContentItem,
  selectedContentItem
} from './ContentItemReducer';

const RootReducer : Reducer<any> = combineReducers({
    currentUser,
    createdUser,
    selectedUser,
    users,
    
    passwordUpdated,
    
    course,
    courses,
    selectedCourse,
    archivedCourse,
    bookmarkedCourse,
    bookmarkedCourses,

    removedBookmark,

    createdEnrollment,
    enrollments,
    removedEnrollment,

    roles,
    createdRole,
    selectedRole,
    currentUserRoles,

    permissions,
    addedPermissions,

    listContentItems,
    createdContentItem,
    selectedContentItem
})

export default RootReducer;