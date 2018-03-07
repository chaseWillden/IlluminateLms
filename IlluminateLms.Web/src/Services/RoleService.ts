import {ApiService} from "./ApiService";
import { Role, Result } from "../Models";

export class RoleServices extends ApiService{
  static BASE = "/api/role";

  /**
   * Get all roles
   */
  static async GetAllRoles() : Promise<Role[]>{
    let roles = await this.Get<Result<Role[]>>(this.BASE);
    return roles.data;
  }

  /**
   * Create role
   * @param role
   */
  static async CreateRole(role: Role) : Promise<Role>{
    let results = await this.Post<Result<Role>>(this.BASE, role);
    return results.data;
  }

  /**
   * Get role by id
   * @param roleId 
   */
  static async GetRoleById(roleId: number) : Promise<Role>{
    var results = await this.Get<Result<Role>>(`${this.BASE}/${roleId}`);
    return results.data;
  }

  /**
   * Update role
   * @param role 
   */
  static async UpdateRole(role: Role) : Promise<Role>{
    var results = await this.Post<Result<Role>>(`${this.BASE}/${role.roleId}`, role);
    return results.data;
  }

  /**
   * Get current user roles
   */
  static async GetCurrentUserRoles() : Promise<Role[]>{
    var results = await this.Get<Result<Role[]>>(`${this.BASE}/current`);
    return results.data;
  }
}