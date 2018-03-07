import { PasswordError } from './PasswordError'
import { Base } from './Base';

export class Password extends Base{
  succeeded: boolean = false;
  errors: PasswordError[] = [];
}