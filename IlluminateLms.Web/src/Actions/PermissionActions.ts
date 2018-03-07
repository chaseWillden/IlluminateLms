import { Permission } from "../Models/index";
import { LIST_PERMISSIONS, ADDED_PERMISSIONS } from "../Constants/ActionTypes";
import { PermissionService } from "../Services";

/**
 * List permissions success
const ListPermissionsSuccess = (permissions: Permission) => ({
 * @param createdRole 
 */
const ListPermissionsSuccess = (permissions: Permission[]) => ({
  type: LIST_PERMISSIONS,
  permissions
})

/**
 * List permissions
 */
export const ListPermissions = () => (dispatch: any) => {
  return PermissionService.GetAllPermissions()
    .then(permissions => dispatch(ListPermissionsSuccess(permissions)))
    .catch(err => {
      throw err;
    })
}

/**
 * Added permissions success
 * @param addedPermissions
 */
const AddedPermissionsSuccess = (addedPermissions: Permission[]) => ({
  type: ADDED_PERMISSIONS,
  addedPermissions
})

/**
 * Added permissions
 * @param roleId 
 * @param permissions 
 */
export const AddedPermissions = (roleId: number, permissions: Permission[]) => (dispatch: any) => {
  return PermissionService.AddPermissionsToRole(roleId, permissions)
    .then(results => dispatch(AddedPermissionsSuccess(results)))
    .catch(err => {
      throw err;
    })
}