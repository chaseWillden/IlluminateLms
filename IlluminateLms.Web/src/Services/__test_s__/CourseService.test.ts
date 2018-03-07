import { AuthService, CourseService } from "../";
import { Course } from "../../Models/index";

const username = 'smithj@gmail.com';
const password = 'PassWord1';
const name = '__TEST__';
const code = '__CODE__';
const description = '__DESCRIPTION__';
const description2 = description + '2';
let testCourseId = -1;
let testCourseAccountId = -1;

describe('Course Service', () => {
  beforeAll(async (done) => {
    try{
      await AuthService.Login(username, password);
      done();
    }
    catch (e){
      console.error(e);
      var err = new Error();
      console.error(err.stack);
      throw e;
    }
  })

  it('should create course', async () => {
    try{
      const course = await CourseService.CreateCourse({
        name: name,
        courseCode: code,
        description: description
      } as Course);

      expect(course.courseCode).toEqual(code);
      expect(course.description).toEqual(description);
      expect(course.name).toEqual(name);
      testCourseId = course.courseId;
      testCourseAccountId = course.account.accountId;
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should find course', async () => {
    try {
      const courses = await CourseService.FindCourse(name);
      expect(courses.length).toBeGreaterThan(0);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should find courses by account id', async () => {
    try {
      const courses = await CourseService.GetCoursesByAccountId(testCourseAccountId);
      expect(courses.length).toBeGreaterThan(0);
      expect(courses.filter(x => x.name === name)).not.toBeNull();
      expect(courses.filter(x => x.name === name).length).toBeGreaterThanOrEqual(1);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should get course by id', async () => {
    try {
      const course = await CourseService.GetCourseById(testCourseId);
      expect(course).not.toBeNull();
      expect(course.courseId).toEqual(testCourseId);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  })

  it('should update course', async () => {
    try {
      let course = await CourseService.GetCourseById(testCourseId);
      expect(course).not.toBeNull();
      course.description = description2
      const updated = await CourseService.UpdateCourse(course);
      expect(updated).not.toBeNull();
      expect(updated.description).toEqual(description2);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  })

  it('should delete course', async () => {
    try{
      const removed = await CourseService.ArchiveCourse(testCourseId);
      expect(removed).toBeTruthy();
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  })

})