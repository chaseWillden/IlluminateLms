import { User, Course } from ".";
import { Base } from "./Base";

export class ContentItem extends Base{
  contentItemId: number = -1;
  title: string = '';
  description: string = '';
  createdDate: Date = new Date();
  createdBy: User = new User({});
  course: Course = new Course({});
  [key: string]: any;
}