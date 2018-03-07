using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IUserRepository
    {
        Task<List<ApplicationUser>> GetAllUsers();
        Task<ApplicationUser> CreateUser(ApplicationUser user);
        Task<ApplicationUser> GetUserById(long userId);
        Task<ApplicationUser> UpdateUser(ApplicationUser user);
        Task<bool> DeleteUser(ApplicationUser user);
        Task<object> UpdatePassword(ApplicationUser user, string password);
        Task<ApplicationUser> GetUserByEmail(string email);
    }
}