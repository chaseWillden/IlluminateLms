import * as jQuery from 'jquery';
import {AuthService} from "./AuthService";
let $ = jQuery;

export class ApiService{

  static BASE_API_URL = 'http://localhost:5001';

  public static VerifyError(err: any){
    if (err.status === 401) { // unauthorized
      console.log("Token Found: " + AuthService.GetToken());
      console.error("Unauthorized: Logging out...");
      AuthService.logout();
      throw err;
    }
    throw err;
  }

  /**
   * Perform a get request
   * @param url
   * @returns {Promise<*>}
   * @constructor
   */
  static async Get<T>(url: string): Promise<T>{
    try{
      return await $.ajax({
        method: 'GET',
        url: ApiService.BASE_API_URL + url,
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer ' + AuthService.GetToken()
        }
      });
    }
    catch (err){
      ApiService.VerifyError(err);
      return new Promise<T>((_, reject) => {
        reject(err);
      })
    }
  }

  /**
   * Perform a post request
   * @param url
   * @param data
   * @returns {Promise<*>}
   * @constructor
   */
  static async Post<T>(url: string, data: any): Promise<T>{
    try {
      return await $.ajax({
        method: 'POST',
        url: ApiService.BASE_API_URL + url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: {
          Authorization: 'Bearer ' + AuthService.GetToken()
        }
      })
    }
    catch (err){
      ApiService.VerifyError(err);
      return new Promise<T>((_, reject) => {
        reject(err);
      })
    }
  }

  /**
   * Send delete request
   * @param {string} url
   * @returns {Promise<T>}
   * @constructor
   */
  static async Delete<T>(url: string): Promise<T>{
    try{
      return await $.ajax({
        method: 'DELETE',
        url: ApiService.BASE_API_URL + url,
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer ' + AuthService.GetToken()
        }
      });
    }
    catch (err){
      ApiService.VerifyError(err);
      return new Promise<T>((_, reject) => {
        reject(err);
      })
    }
  }
}