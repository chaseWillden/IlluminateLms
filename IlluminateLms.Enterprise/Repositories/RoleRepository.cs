using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IlluminateLms.Enterprise.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IlluminateLmsContext _ctx;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ILogger<RoleRepository> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public RoleRepository(
            IlluminateLmsContext ctx, 
            RoleManager<ApplicationRole> roleManager, 
            ILogger<RoleRepository> logger,
            UserManager<ApplicationUser> userManager
            )
        {
            _ctx = ctx;
            _roleManager = roleManager;
            _logger = logger;
            _userManager = userManager;
        }

        /// <summary>
        /// Get all roles
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationRole>> GetAllRoles()
        {
            return await _roleManager.Roles.Where(x => x.IsActive).ToListAsync();
        }

        /// <summary>
        /// Create role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<ApplicationRole> CreateRole(ApplicationRole role)
        {
            var results = await _roleManager.CreateAsync(role);
            if (results.Succeeded) return role;
            _logger.LogError($"Unable to create role {string.Join(", ", results.Errors.Select(x => x.Description))}");
            throw new Exception("Unable to create role");

        }

        /// <summary>
        /// Find by role id
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<ApplicationRole> GetRoleById(long roleId)
        {
            return await _roleManager.FindByIdAsync(roleId.ToString());
        }

        /// <summary>
        /// Update role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<ApplicationRole> UpdateRole(ApplicationRole role)
        {
            var results = await _roleManager.UpdateAsync(role);
            if (results.Succeeded)
            {
                return role;
            }
            _logger.LogError($"Unable to update role {string.Join(", ", results.Errors.Select(x => x.Description))}");
            throw new Exception("Unable to update role");
        }

        /// <summary>
        /// Get role by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<ApplicationRole> GetRoleByName(string name)
        {
            return await _roleManager.FindByNameAsync(name);
        }

        /// <summary>
        /// Get roles by name array
        /// </summary>
        /// <param name="roles"></param>
        /// <returns></returns>
        public async Task<List<ApplicationRole>> GetRolesByNameArray(List<string> roles)
        {
            return await _roleManager.Roles.Where(x => roles.Contains(x.Name)).ToListAsync();
        }

        /// <summary>
        /// Get user roles
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<List<ApplicationRole>> GetUserRoles(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return await GetRolesByNameArray(roles.ToList());
        }

        /// <summary>
        /// Add roles to user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="roles"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> AddRolesToUser(ApplicationUser user, List<string> roles)
        {
            var results = await _userManager.AddToRolesAsync(user, roles);
            if (results.Succeeded)
            {
                return false;
            }
            _logger.LogError($"Unable to add roles {string.Join(", ", results.Errors.Select(x => x.Description))} to user {user.FullName}");
            throw new Exception("Unable to update role");
        }
    }
}