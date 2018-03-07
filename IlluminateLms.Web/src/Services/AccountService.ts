import {Account, Result} from "../Models";
import {ApiService} from "./ApiService";

export class AccountService extends ApiService{

  static BASE = "/api/account";

  /**
   * Get all accounts
   * @returns {Promise<*>}
   * @constructor
   */
  static async GetAllAccounts() : Promise<Account[]>{
    let accounts = await this.Get<Result<Account[]>>(this.BASE);
    return accounts.data;
  }

  /**
   * Create an account
   * @param {Account} account
   * @returns {Promise<Account>}
   * @constructor
   */
  static async CreateAccount(account: Account) : Promise<Account>{
    let results = await this.Post<Result<Account>>(this.BASE, account);
    return results.data;
  }

  /**
   * Get account by id
   * @param {number} accountId
   * @returns {Promise<Account>}
   * @constructor
   */
  static async GetAccountById(accountId: number) : Promise<Account>{
    let results = await this.Get<Result<Account>>(`${this.BASE}/${accountId}`);
    return results.data;
  }

  /**
   * Get children accounts
   * @param {number} parentAccountId
   * @returns {Promise<Array<Account>>}
   * @constructor
   */
  static async GetChildrenAccounts(parentAccountId: number) : Promise<Array<Account>>{
    let results = await this.Get<Result<Array<Account>>>(`${this.BASE}/${parentAccountId}/children`);
    return results.data;
  }

  /**
   * Get Root account
   * @returns {Promise<Account>}
   * @constructor
   */
  static async GetRootAccount() : Promise<Account>{
    let results = await this.Get<Result<Account>>(`${this.BASE}/root`);
    return results.data;
  }

  /**
   * Delete an account
   * @param {number} accountId
   * @returns {Promise<Boolean>}
   * @constructor
   */
  static async DeleteAnAccount(accountId: number) : Promise<Boolean>{
    let results = await this.Delete<Result<Boolean>>(`${this.BASE}/${accountId}`);
    return results.data;
  }

  /**
   * Update an account
   * @param {Account} account
   * @returns {Promise<Account>}
   * @constructor
   */
  static async UpdateAnAccount(account: Account) : Promise<Account>{
    let results = await this.Post<Result<Account>>(`${this.BASE}/${account.accountId}/update`, account);
    return results.data;
  }
}