import { UserServices } from "../Services";
import { User } from "../Models";
import { 
    LOAD_USER, 
    CREATE_USER, 
    LIST_USERS, 
    SELECTED_USER,
    UPDATED_USER,
    PASSWORD_UPDATED
} from "../Constants/ActionTypes";

/**
 * Load current user success
 * @param user 
 */
const LoadCurrentUserSuccess = (user: User) => ({
    type: LOAD_USER,
    user
})

/**
 * Load current user
 */
export const LoadCurrentUser = () => (dispatch: any) => {
    return UserServices.GetWhoAmI()
        .then(user => dispatch(LoadCurrentUserSuccess(user)))
        .catch(err => {
            throw (err);
        });
}

/**
 * Create user success
 * @param user
 */
const CreateUserSuccess = (createdUser: User) => ({
    type: CREATE_USER,
    createdUser
});

/**
 * Create user
 * @param user 
 */
export const CreateUser = (user: User) => (dispatch: any) => {
    if (!user.userName) user.userName = user.email;
    user.displayName = user.firstName + ' ' + user.lastName;
    user.fullName = user.displayName;
    user.sortableName = user.lastName + ', ' + user.firstName;
    return UserServices.CreateUser(user)
        .then(user => dispatch(CreateUserSuccess(user)))
        .catch(err => {
            throw err;
        })
}

/**
 * List all users success
 * @param users 
 */
const ListAllUsersSuccess = (users: User[]) => ({
    type: LIST_USERS,
    users
});

/**
 * List all users
 * @param users 
 */
export const ListAllUsers = () => (dispatch: any) => {
    return UserServices.GetAllUsers()
        .then(users => dispatch(ListAllUsersSuccess(users)))
        .catch(err => {
            throw err;
        });
}

/**
 * Get user by id success
 * @param selectedUser 
 */
const GetUserByIdSuccess = (selectedUser: User) => ({
    type: SELECTED_USER,
    selectedUser
})

/**
 * Get user by id
 * @param userId
 */
export const GetUserById = (userId: number) => (dispatch: any) => {
    return UserServices.GetUserById(userId)
        .then(user => dispatch(GetUserByIdSuccess(user)))
        .catch(err => {
            throw err;
        })
}

/**
 * Update user success
 * @param selectedUser 
 */
const UpdateUserSuccess = (selectedUser: User) => ({
    type: UPDATED_USER,
    selectedUser
})

/**
 * Update user
 * @param user 
 */
export const UpdateUser = (user: User) => (dispatch: any) => {
    return UserServices.UpdateUser(user)
        .then(user => dispatch(UpdateUserSuccess(user)))
        .catch(err => {
            throw err;
        })
}

/**
 * Delete user
 * @param userId
 */
export const DeleteUser = (userId: number) => (dispatch: any) => {
    return UserServices.DeleteUser(userId)
        .then(user => dispatch(UpdateUserSuccess(user)))
        .catch(err => {
            throw err;
        })
}

/**
 * Update password success
 * @param passwordUpdated 
 */
const UpdatePasswordSuccess = (passwordUpdated: boolean) => ({
    type: PASSWORD_UPDATED,
    passwordUpdated
});

/**
 * Update password
 * @param userId 
 * @param password 
 */
export const UpdatePassword = (userId: number, password: string) => (dispatch: any) => {
    return UserServices.UpdatePassword(userId, password)
        .then(worked => dispatch(UpdatePasswordSuccess(worked.succeeded)))
        .catch(err => {
            throw err;
        })
}