import { AuthService, UserServices } from "../index";
import { User } from "../../Models";

const username = 'smithj@gmail.com';
const password = 'PassWord1';
const first = 'John';
const last = 'Smith';

const testFirst = '__TEST__';
const testLast = 'User';
const testLast2 = 'User2';
const testEmail = 'test.user@test.com';
let testUserId = -1;

describe('User Service', () => {

  beforeAll(async (done) => {
    try{
      await AuthService.Login(username, password);
      done();
    }
    catch (e){
      console.error(e);
      var err = new Error();
      console.error(err.stack);
      throw e;
    }
  })

  it('should get whoami', async () => {
    try{
      const user = await UserServices.GetWhoAmI();
      expect(user.firstName).toBe(first);
      expect(user.lastName).toBe(last);
      expect(user.email).toBe(username);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should create user', async () => {
    try{
      const user = await UserServices.CreateUser({
        firstName: testFirst,
        lastName: testLast,
        email: testEmail,
        displayName: testFirst + ' ' + testLast,
        sortableName: testLast + ', ' + testFirst,
        userName: testEmail
      } as User);
      expect(user.firstName).toBe(testFirst);
      expect(user.lastName).toBe(testLast);
      expect(user.email).toBe(testEmail);
      testUserId = user.userId
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should get user by id', async () => {
    try{
      const user = await UserServices.GetUserById(testUserId);
      expect(user.firstName).toBe(testFirst);
      expect(user.lastName).toBe(testLast);
      expect(user.email).toBe(testEmail);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should get user by email', async () => {
    try{
      const user = await UserServices.GetUserByEmail(testEmail);
      expect(user.firstName).toBe(testFirst);
      expect(user.lastName).toBe(testLast);
      expect(user.email).toBe(testEmail);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  })

  it('should get all users', async () => {
    try {
      const users = await UserServices.GetAllUsers();
      expect(users.length).toBeGreaterThan(1);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should update user', async () => {
    try {
      let found = await UserServices.GetUserById(testUserId);
      found.lastName = testLast2;
      const user = await UserServices.UpdateUser(found);
      expect(user.lastName).toBe(testLast2);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });

  it('should delete user', async () => {
    try{
      await UserServices.DeleteUser(testUserId);
    }
    catch (e){
      expect(e).not.toBeNull();
      throw e;
    }
  });
})