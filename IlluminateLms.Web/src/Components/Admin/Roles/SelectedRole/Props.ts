import { Role, Permission } from "../../../../Models";

export interface PermissionListProps {
  edit: boolean;
  selectedRole: Role;
  permissions: Permission[];
}