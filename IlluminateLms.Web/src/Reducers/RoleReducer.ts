import { Role } from '../Models'
import {
  CREATE_ROLE,
  LIST_ROLES,
  SELECTED_ROLE,
  UPDATE_ROLE,
  GET_CURRENT_USER_ROLES
} from '../Constants/ActionTypes'

const initialState: Role = {
  name: '',
  description: '',
  roleId: -1,
  permissions: []
}

export const roles = (state: Role[] = [], action: any) => {
  switch (action.type) {
    case LIST_ROLES:
      return action.roles;
    default:
      return state;
  }
}

export const createdRole = (state: Role = initialState, action: any) => {
  switch (action.type){
    case CREATE_ROLE:
      return action.createdRole;
    default:
      return state;
  }
}

export const selectedRole = (state: Role = initialState, action: any) => {
  switch (action.type){
    case UPDATE_ROLE:
    case SELECTED_ROLE:
      return action.selectedRole;
    default:
      return state;
  }
}

export const currentUserRoles = (state: Role[] = [], action: any) => {
  switch (action.type){
    case GET_CURRENT_USER_ROLES:
      return action.currentUserRoles
    default:
      return state;
  }
}