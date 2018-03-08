import { Enrollment } from "../../../Models";

export interface ClassListTableProps {
  selectRow: Function;
  enrollments: Enrollment[];
  selected: {[id:number]: Enrollment};
  parent: any;
}