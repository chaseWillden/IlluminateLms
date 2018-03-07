import { ContentItem, Course } from "../../../Models/index";

export interface ContentActionProps{
  item: ContentItem;
  selectedCourse: Course;
  getContentItems: Function;
}