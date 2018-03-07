import { Permission } from '../Models'
import {
  LIST_PERMISSIONS,
  ADDED_PERMISSIONS
} from '../Constants/ActionTypes'

// const initialState: Permission = {
//   name: '',
//   description: '',
//   roleId: -1
// }

export const permissions = (state: Permission[] = [], action: any) => {
  switch (action.type) {
    case LIST_PERMISSIONS:
      return action.permissions;
    default:
      return state;
  }
}

/**
 * Added permissions to role
 * @param state 
 * @param action 
 */
export const addedPermissions = (state: Permission[] = [], action: any) => {
  switch (action.type){
    case ADDED_PERMISSIONS:
      return action.addedPermissions;
    default:
      return state;
  }
}