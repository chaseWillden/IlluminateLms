import { Base } from "./Base";

export class Auth extends Base{
  access_token: string = '';
  expires_in: string = '';
  id_token: string = '';
  refresh_token: string = '';
  token_type: string = '';
}