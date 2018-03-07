using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IRoleRepository
    {
        Task<List<ApplicationRole>> GetAllRoles();
        Task<ApplicationRole> CreateRole(ApplicationRole role);
        Task<ApplicationRole> GetRoleById(long roleId);
        Task<ApplicationRole> UpdateRole(ApplicationRole role);
        Task<ApplicationRole> GetRoleByName(string name);
        Task<List<ApplicationRole>> GetUserRoles(ApplicationUser user);
        Task<List<ApplicationRole>> GetRolesByNameArray(List<string> roles);
        Task<bool> AddRolesToUser(ApplicationUser user, List<string> roles);
    }
}