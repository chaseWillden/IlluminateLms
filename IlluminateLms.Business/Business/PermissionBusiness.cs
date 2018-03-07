using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Interfaces;

namespace IlluminateLms.Business.Business
{
    public class PermissionBusiness
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IMapper _mapper;
        private readonly IRoleRepository _roleRepository;

        public PermissionBusiness(IPermissionRepository permissionRepository, IMapper mapper, IRoleRepository roleRepository)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
            _roleRepository = roleRepository;
        }

        /// <summary>
        /// Get all permissions
        /// </summary>
        /// <returns></returns>
        public List<Permission> GetAllPermissions()
        {
            var permissions = _permissionRepository.GetAllPermissions();
            return permissions.Select(_mapper.Map<Permission>).ToList();
        }

        /// <summary>
        /// Get permissions by role
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<List<Permission>> GetPermissionsByRole(long roleId)
        {
            var role = await _roleRepository.GetRoleById(roleId);
            var permissions = await _permissionRepository.GetPermissionsForRole(role);
            return permissions.Select(_mapper.Map<Permission>).ToList();
        }

        /// <summary>
        /// Add permissions to role
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="permissions"></param>
        /// <returns></returns>
        public async Task<List<Permission>> AddPermissionsToRole(long roleId, List<Permission> permissions)
        {
            var role = await _roleRepository.GetRoleById(roleId);
            await _permissionRepository.ClearPermissionsForRole(role);
            await _permissionRepository.AddPermissionsToRole(role, permissions.Select(_mapper.Map<ApplicationPermission>).ToList());
            return await GetPermissionsByRole(roleId);
        }
    }
}