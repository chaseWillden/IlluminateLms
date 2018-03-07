using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IlluminateLms.Enterprise.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<UserRepository> _logger;
        private readonly IMapper _mapper;

        public UserRepository(UserManager<ApplicationUser> userManager, ILogger<UserRepository> logger, IMapper mapper)
        {
            _userManager = userManager;
            _logger = logger;
            _mapper = mapper;
        }

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationUser>> GetAllUsers()
        {
            var users = await _userManager.Users.Where(x => x.IsActive).ToListAsync();
            return users
                .OrderBy(x => x.SortableName)
                .ToList();
        }

        /// <summary>
        /// Create user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<ApplicationUser> CreateUser(ApplicationUser user)
        {
            var created = await _userManager.CreateAsync(_mapper.Map<ApplicationUser>(user));
            if (created.Succeeded) return await _userManager.FindByEmailAsync(user.Email);
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(user);
            _logger.LogError($"Unable to create user: {json} because {string.Join(", ", created.Errors.Select(x => x.Description))}");
            throw new Exception("Unable to create user");
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> GetUserById(long userId)
        {
            return await _userManager.FindByIdAsync(userId.ToString());
        }

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<ApplicationUser> UpdateUser(ApplicationUser user)
        {
            var results = await _userManager.UpdateAsync(user);
            if (results.Succeeded)
            {
                return user;
            }
            throw new Exception("Unable to update user");
        }

        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<bool> DeleteUser(ApplicationUser user)
        {
            var results = await _userManager.DeleteAsync(user);
            return results.Succeeded;
        }

        /// <summary>
        /// Update password
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<object> UpdatePassword(ApplicationUser user, string password)
        {
            var results = await _userManager.AddPasswordAsync(user, password);
            return new
            {
                results.Errors,
                results.Succeeded
            };
        }

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> GetUserByEmail(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }
    }
}