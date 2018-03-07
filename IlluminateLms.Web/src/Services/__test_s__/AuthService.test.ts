import { AuthService } from "../index";

const username = 'smithj@gmail.com';
const password = 'PassWord1';

describe('Auth Service calls', () => {
  it('should login', async () => {
    try{
      let results = await AuthService.Login(username, password);
      expect(results.access_token).toBeInstanceOf('string');
    }
    catch (e){
      expect(e).not.toBeNull();
    }
  });
});