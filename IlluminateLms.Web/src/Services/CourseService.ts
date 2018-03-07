import {Result, Course} from "../Models";
import {ApiService} from "./ApiService";

export class CourseService extends ApiService{

  static BASE = "/api/course";

  /**
   * Find courses
   * @param {string} q
   * @returns {Promise<Course[]>}
   * @constructor
   */
  static async FindCourse(q: string): Promise<Course[]>{
     let courses = await this.Get<Result<Course[]>>(this.BASE + "?q=" + q);
     return courses.data;
  }

  /**
   * Get courses by account id
   * @param {number} accountId
   * @returns {Promise<Course[]>}
   * @constructor
   */
  static async GetCoursesByAccountId(accountId: number): Promise<Course[]>{
    let courses = await this.Get<Result<Course[]>>(`${this.BASE}/account/${accountId}`);
    return courses.data;
  }

  /**
   * Create course
   * @param {Course} course
   * @returns {Promise<Course>}
   * @constructor
   */
  static async CreateCourse(course: Course): Promise<Course>{
    let results = await this.Post<Result<Course>>(this.BASE, course);
    return results.data;
  }

  /**
   * Get course by id
   * @param {number} courseId
   * @returns {Promise<Course>}
   * @constructor
   */
  static async GetCourseById(courseId: number): Promise<Course>{
    let results = await this.Get<Result<Course>>(`${this.BASE}/${courseId}`);
    return results.data;
  }

  /**
   * Archive course
   * @param {number} courseId
   * @returns {Promise<boolean>}
   * @constructor
   */
  static async ArchiveCourse(courseId: number): Promise<boolean>{
    let results = await this.Delete<Result<boolean>>(`${this.BASE}/${courseId}`);
    return results.data;
  }

  /**
   * Update course
   * @param {Course} course
   * @returns {Promise<Course>}
   * @constructor
   */
  static async UpdateCourse(course: Course): Promise<Course>{
    let results = await this.Post<Result<Course>>(`${this.BASE}/update`, course);
    return results.data;
  }
}