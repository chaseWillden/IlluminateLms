import {
  CREATED_ENROLLMENT,
  LIST_ENROLLMENTS,
  REMOVED_ENROLLMENT
} from "../Constants/ActionTypes";

import {Enrollment} from '../Models'
import {EnrollmentService} from '../Services'

/**
 * Create enrollment success
 * @param bookmarkedCourse 
 */
const CreateEnrollmentSuccess = (createdEnrollment: Enrollment) => ({
  type: CREATED_ENROLLMENT,
  createdEnrollment
});

/**
 * Create course enrollment
 * @param bookmark 
 */
export const CreateEnrollment = (enrollment: Enrollment) => (dispatch: any) => {
  return EnrollmentService.CreateEnrollment(enrollment)
    .then(enrollment => dispatch(CreateEnrollmentSuccess(enrollment)))
    .catch(err => {
      throw err;
    })
}

/**
 * List enrollments success
 * @param enrollments 
 */
const ListEnrollmentsSuccess = (enrollments: Enrollment[]) => ({
  type: LIST_ENROLLMENTS,
  enrollments
});

/**
 * List enrollments
 * @param courseId 
 */
export const ListEnrollments = (courseId: number) => (dispatch: any) => {
  return EnrollmentService.GetEnrollmentsForCourse(courseId)
    .then(enrollments => dispatch(ListEnrollmentsSuccess(enrollments)))
    .catch(err => {
      throw err;
    });
}

/**
 * Delete an enrollment
 */
const DeleteEnrollmentSuccess = (removedEnrollment: boolean) => ({
  type: REMOVED_ENROLLMENT,
  removedEnrollment
})

/**
 * Delete enrollment
 * @param enrollmentId
 */
export const DeleteEnrollment = (enrollmentId: number) => (dispatch: any) => {
  return EnrollmentService.RemoveEnrollment(enrollmentId)
    .then(worked => dispatch(DeleteEnrollmentSuccess(worked)))
    .catch(err => {
      throw err;
    })
}