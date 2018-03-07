import {User} from '../Models'
import {
    LOAD_USER, 
    CREATE_USER, 
    LIST_USERS,
    SELECTED_USER,
    PASSWORD_UPDATED
} from '../Constants/ActionTypes'

const initialState : User = {
    email: '',
    firstName: '',
    lastName: '',
    userId: -1,
    displayName: '',
    sortableName: '',
    fullName: '',
    isActive: false,
    avatar: '',
    userName: ''
}

export const currentUser = (state: User = initialState, action: any) => {
    switch (action.type){
        case LOAD_USER:
            return action.user;
        default: 
            return state;
    }
}

export const createdUser = (state: User = initialState, action: any) => {
    switch (action.type){
        case CREATE_USER:
            return action.createdUser;
        default:
            return state;
    }
}

export const users = (state: User[] = [], action: any) => {
    switch (action.type){
        case LIST_USERS:
            return action.users;
        default:
            return state;
    }
}

export const selectedUser = (state: User = initialState, action: any) => {
    switch (action.type){
        case SELECTED_USER:
            return action.selectedUser;
        default:
            return state;
    }
}

export const passwordUpdated = (state: boolean = false, action: any) => {
    switch (action.type){
        case PASSWORD_UPDATED:
            return action.passwordUpdated;
        default:
            return state;
    }
}