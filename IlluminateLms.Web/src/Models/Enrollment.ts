import { Course, User } from "./index";
import { Base } from "./Base";

export class Enrollment extends Base{
  enrollmentId: number = -1;
  createdDate: Date = new Date();
  start?: Date = new Date();
  end?: Date = new Date();
  isActive: boolean = false;
  isArchived: boolean = false;
  timezone: string = '';
  course: Course = new Course();
  createdBy: User = new User();
  user: User = new User();
}