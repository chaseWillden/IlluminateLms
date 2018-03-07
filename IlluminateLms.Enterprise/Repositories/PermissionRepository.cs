using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Helpers;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace IlluminateLms.Enterprise.Repositories
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IRoleRepository _roleRepository;

        public PermissionRepository(RoleManager<ApplicationRole> roleManager, IRoleRepository roleRepository)
        {
            _roleManager = roleManager;
            _roleRepository = roleRepository;
        }

        /// <summary>
        /// Get all permissions
        /// </summary>
        /// <returns></returns>
        public List<ApplicationPermission> GetAllPermissions()
        {
            return ApplicationPermissions.AllPermissions.OrderBy(x => x.GroupName).ToList();
        }

        /// <summary>
        /// Get permissions for role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        public async Task<List<ApplicationPermission>> GetPermissionsForRole(ApplicationRole role)
        {
            var claims = await _roleManager.GetClaimsAsync(role);
            return claims.Select(x => ApplicationPermissions.GetPermissionByValue(x.Value)).ToList();
        }

        /// <summary>
        /// Add permissions to role
        /// </summary>
        /// <param name="role"></param>
        /// <param name="permissions"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task AddPermissionsToRole(ApplicationRole role, List<ApplicationPermission> permissions)
        {
            var claims = permissions.Select(x => new Claim(CustomClaimTypes.Permission, ApplicationPermissions.GetPermissionByValue(x.Value))).ToList();
            foreach (var claim in claims)
            {
                var results = await _roleManager.AddClaimAsync(role, claim);
                if (!results.Succeeded) throw new Exception($"Unable to add claim {claim.Value}");
            }
        }

        /// <summary>
        /// Remove permissions from role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task ClearPermissionsForRole(ApplicationRole role)
        {
            var claims = await _roleManager.GetClaimsAsync(role);
            foreach (var claim in claims)
            {
                var removed = await _roleManager.RemoveClaimAsync(role, claim);
                if (!removed.Succeeded) throw new Exception("Unable to remove permission from role");
            }
        }
    }
}