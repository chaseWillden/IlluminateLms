import { Base } from "./Base";

export class Account extends Base{
  accountId: number = -1;
  isArchived: boolean = false;
  name: string = '';
  parentAccount: Account = {} as Account;
}