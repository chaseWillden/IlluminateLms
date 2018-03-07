import { Role } from "../Models/index";
import { CREATE_ROLE, LIST_ROLES, SELECTED_ROLE, GET_CURRENT_USER_ROLES } from "../Constants/ActionTypes";
import { RoleServices } from "../Services/index";

/**
 * Created role success
 * @param createdRole 
 */
const CreatedRoleSuccess = (createdRole: Role) => ({
  type: CREATE_ROLE,
  createdRole
})

/**
 * Create role
 * @param role 
 */
export const CreateRole = (role: Role) => (dispatch: any) => {
  return RoleServices.CreateRole(role)
    .then(results => dispatch(CreatedRoleSuccess(results)))
    .catch(err => {
      throw err;
    }) 
}

/**
 * List roles success
 * @param roles 
 */
const ListAllRolesSuccess = (roles: Role[]) => ({
  type: LIST_ROLES,
  roles
})

/**
 * List roles
 */
export const ListAllRoles = () => (dispatch: any) => {
  return RoleServices.GetAllRoles()
    .then(roles => dispatch(ListAllRolesSuccess(roles)))
    .catch(err => {
      throw err;
    })
}

/**
 * Selected role success
 * @param selectedRole 
 */
const GetRoleByIdSuccess = (selectedRole: Role) => ({
  type: SELECTED_ROLE,
  selectedRole
})

/**
 * Select role
 * @param roleId 
 */
export const GetRoleById = (roleId: number) => (dispatch: any) => {
  return RoleServices.GetRoleById(roleId)
    .then(role => dispatch(GetRoleByIdSuccess(role)))
    .catch(err => {
      throw err;
    })
}

/**
 * Update role
 * @param role 
 */
export const UpdateRole = (role: Role) => (dispatch: any) => {
  return RoleServices.UpdateRole(role)
    .then(role => dispatch(GetRoleByIdSuccess(role)))
    .catch(err => {
      throw err;
    })
}

/**
 * Get current user roles success
 * @param currentUserRoles 
 */
const GetCurrentUserRolesSuccess = (currentUserRoles: Role[]) => ({
  type: GET_CURRENT_USER_ROLES,
  currentUserRoles
});

/**
 * Get current user roles
 */
export const GetCurrentUserRoles = () => (dispatch: any) => {
  return RoleServices.GetCurrentUserRoles()
    .then(roles => dispatch(GetCurrentUserRolesSuccess(roles)))
    .catch(err => {
      throw err;
    })
}