import { Course, User } from "./index";
import { Base } from "./Base";

export class BookmarkedCourse extends Base{
  bookmarkedCourseId: number = -1;
  course: Course = new Course();
  user: User = new User();
}