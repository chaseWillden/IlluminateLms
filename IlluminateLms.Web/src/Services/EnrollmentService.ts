import {Enrollment, Result} from "../Models";
import {ApiService} from "./ApiService";

export class EnrollmentService extends ApiService{

  static BASE = "/api/enrollment";

  /**
   * Get enrollments for course
   * @returns {Promise<*>}
   * @constructor
   */
  static async GetEnrollmentsForCourse(courseId: number) : Promise<Enrollment[]>{
    let enrollments = await this.Get<Result<Enrollment[]>>(`${this.BASE}/course/${courseId}`);
    return enrollments.data;
  }

  /**
   * Create enrollment
   * @param enrollment 
   */
  static async CreateEnrollment(enrollment: Enrollment) : Promise<Enrollment>{
    let enrollmentResults = await this.Post<Result<Enrollment>>(`${this.BASE}`, enrollment);
    return enrollmentResults.data;
  }

  /**
   * Remove an enrollment
   */
  static async RemoveEnrollment(enrollmentId: number) : Promise<boolean>{
    let success = await this.Delete<Result<boolean>>(`${this.BASE}/${enrollmentId}`);
    return success.data;
  }
}