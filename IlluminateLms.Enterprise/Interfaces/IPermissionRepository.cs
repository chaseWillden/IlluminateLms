using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IPermissionRepository
    {
        List<ApplicationPermission> GetAllPermissions();
        Task<List<ApplicationPermission>> GetPermissionsForRole(ApplicationRole role);
        Task AddPermissionsToRole(ApplicationRole role, List<ApplicationPermission> permissions);
        Task ClearPermissionsForRole(ApplicationRole role);
    }
}