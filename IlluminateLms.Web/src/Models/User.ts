import { Base } from "./Base";

export class User extends Base{
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  userId: number = -1;
  displayName: string = '';
  fullName: string = '';
  sortableName: string = '';
  isActive: boolean = false;
  userName: string = '';
  avatar: string = '';
  [key: string]: any;
}