import { Permission } from "./index";
import { Base } from "./Base";

export class Role extends Base{
  roleId: number = -1;
  name: string = '';
  description: string = '';
  permissions: Permission[] = [];
  [key: string]: any;
}