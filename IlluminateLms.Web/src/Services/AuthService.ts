import * as jquery from 'jquery';
let $ = jquery;
import {ApiService} from "./ApiService";
import Cookies from "../Helpers/Cookies";
import {Auth, Result} from "../Models";

const json = localStorage["token"];
let _authTokens: Auth = JSON.parse(json ? json : '{}');
let LOCAL_STORAGE = "token";

export class AuthService{

  /**
   * Get access_token
   * @returns {string}
   * @constructor
   */
  static GetToken() : string{
    if (_authTokens == null) console.error("Login Needed");
    return _authTokens.access_token;
  }

  /**
   * Login
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   * @constructor
   */
  static async Login(username: string, password: string) : Promise<Auth>{
    let auth : Auth = await $.ajax({
      method: "POST",
      contentType: 'application/x-www-form-urlencoded',
      url: ApiService.BASE_API_URL + '/api/auth/token',
      data: ({
        username: username,
        password: password,
        grant_type: 'password',
        scope: 'openid email phone profile offline_access roles',
        resource: window.location.origin
      })
    });

    // not test
    if (window.location.href !== 'about:blank'){
      // Set cookie
      await $.ajax({
        method: 'POST',
        url: '/Login/Validate',
        contentType: 'application/x-www-form-urlencoded',
        data: {
          token: auth.access_token
        }
      });
    }

    localStorage[LOCAL_STORAGE] = JSON.stringify(auth);
    _authTokens = auth;
    return auth;
  }

  /**
   * Ping server to verify still logged in
   * @returns {Promise<boolean>}
   * @constructor
   */
  static async Ping(){
    let ping = await ApiService.Get<Result<boolean>>("/api/auth/ping");
    return ping.status !== "Success" && !ping.data;
  }

  /**
   * Logout user and remove all cookies
   */
  static async logout(){
    delete localStorage[LOCAL_STORAGE];
    Cookies.removeAll();
    let results = await $.ajax({
      method: "GET",
      url: '/Login/Logout'
    });
    if (results){
      window.location.reload();
    }
  }
} 