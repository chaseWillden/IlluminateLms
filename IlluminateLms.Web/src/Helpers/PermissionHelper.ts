import { Role } from "../Models";

/**
 * Check to see if a list of roles
 * contains a permission
 * @param roles 
 * @param name 
 */
export const containsPermissionInRoles = (roles: Role[], name: string) => {
  for (const role of roles){
    if (role.permissions.filter(x => x.value === name).length > 0) return true;
  }
  return false;
}