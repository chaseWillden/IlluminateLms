import { Account } from "./Account";
import { Base } from "./Base";

export class Course extends Base{
  courseId: number = -1;
  name: string = "";
  courseCode: string = "";
  description: string = "";
  start: Date = new Date();
  end: Date = new Date();
  isPublic: boolean = false;
  isPublicToAuthUsers: boolean = false;
  publicSyllabus: boolean = false;
  timeZone: string = '';
  isArchived: boolean = false;
  parentCourse: Course | null = null;
  account: Account = new Account();
  rootAccount: Account = new Account();
  [key: string]: any;
}