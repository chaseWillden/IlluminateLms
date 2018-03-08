import { Course } from '../../../../Models';

export interface SelectedCourseContainerState{
  editNames: boolean;
  course: Course;
  anchor: any;
}