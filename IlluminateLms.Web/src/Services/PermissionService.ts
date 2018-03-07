import {ApiService} from "./ApiService";
import { Permission, Result } from "../Models";

export class PermissionService extends ApiService{
  static BASE = "/api/permission";

  /**
   * Get all permissions
   */
  static async GetAllPermissions() : Promise<Permission[]>{
    let results = await this.Get<Result<Permission[]>>(this.BASE);
    return results.data;
  }

  /**
   * Get permissions for role
   * @param roleId 
   */
  static async GetPermissionsForRole(roleId: number) : Promise<Permission[]>{
    let results = await this.Get<Result<Permission[]>>(`${this.BASE}/role/${roleId}`);
    return results.data;
  }

  /**
   * Add permissions to role
   * @param roleId 
   * @param permissions 
   */
  static async AddPermissionsToRole(roleId: number, permissions: Permission[]) : Promise<Permission[]>{
    let results = await this.Post<Result<Permission[]>>(`${this.BASE}/role/${roleId}`, permissions);
    return results.data;
  }
}