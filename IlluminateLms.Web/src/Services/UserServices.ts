import {ApiService} from "./ApiService";
import {Result, User, Password} from "../Models";

export class UserServices extends ApiService{
  static BASE = "/api/user";

  /**
   * Get current user
   * @returns {Promise<User>}
   * @constructor
   */
  static async GetWhoAmI() : Promise<User>{
    let user = await this.Get<Result<User>>(this.BASE + "/whoami");
    return user.data;
  }

  /**
   * Create a new user
   * @param user 
   */
  static async CreateUser(user: User) : Promise<User>{
    let results = await this.Post<Result<User>>(this.BASE, user);
    return results.data;
  }

  /**
   * Get all users
   */
  static async GetAllUsers() : Promise<User[]>{
    let results = await this.Get<Result<User[]>>(this.BASE);
    return results.data;
  }

  /**
   * Get user by id
   * @param userId 
   */
  static async GetUserById(userId: number) : Promise<User>{
    let results = await this.Get<Result<User>>(`${this.BASE}/${userId}`);
    return results.data;
  }

  /**
   * Update user
   * @param user 
   */
  static async UpdateUser(user: User) : Promise<User>{
    let results = await this.Post<Result<User>>(`${this.BASE}/${user.userId}`, user);
    return results.data;
  }

  /**
   * Delete user
   * @param userId 
   */
  static async DeleteUser(userId: number) : Promise<User>{
    let results = await this.Delete<Result<User>>(`${this.BASE}/${userId}`);
    return results.data;
  }

  /**
   * Update password
   * @param userId 
   * @param password 
   */
  static async UpdatePassword(userId: number, password: string) : Promise<Password>{
    let results = await this.Post<Result<Password>>(`${this.BASE}/${userId}/password`, password);
    return results.data;
  }

  /**
   * Get user by email
   * @param email 
   */
  static async GetUserByEmail(email: string) : Promise<User>{
    let results = await this.Get<Result<User>>(`${this.BASE}/email/${email}`);
    return results.data;
  }
}