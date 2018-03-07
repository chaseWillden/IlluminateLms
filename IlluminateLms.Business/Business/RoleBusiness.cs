using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Interfaces;

namespace IlluminateLms.Business.Business
{
    public class RoleBusiness
    {
        private readonly IMapper _mapper;
        private readonly IRoleRepository _roleRepository;
        private readonly PermissionBusiness _permissionBusiness;
        private readonly UserBusiness _userBusiness;

        public RoleBusiness(
            IMapper mapper, 
            IRoleRepository roleRepository, 
            PermissionBusiness permissionBusiness,
            UserBusiness userBusiness
        )
        {
            _mapper = mapper;
            _roleRepository = roleRepository;
            _permissionBusiness = permissionBusiness;
            _userBusiness = userBusiness;
        }

        /// <summary>
        /// Get all roles
        /// </summary>
        /// <returns></returns>
        public async Task<List<Role>> GetAllRoles()
        {
            var roles = await _roleRepository.GetAllRoles();
            return roles.Select(_mapper.Map<Role>).ToList();
        }

        /// <summary>
        /// Create new role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        public async Task<Role> CreateRole(Role role)
        {
            var exists = await _roleRepository.GetRoleByName(role.Name);
            if (exists != null) return await GetRoleByName(role.Name);
            
            var applicationRole = _mapper.Map<ApplicationRole>(role);
            applicationRole.IsActive = true;
            var results = await _roleRepository.CreateRole(applicationRole);
            return _mapper.Map<Role>(results);
        }

        /// <summary>
        /// Get role by id
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<Role> GetRoleById(long roleId)
        {
            var role = await _roleRepository.GetRoleById(roleId);
            var permissions = await _permissionBusiness.GetPermissionsByRole(role.Id);
            var results = _mapper.Map<Role>(role);
            results.Permissions = permissions;
            return results;
        }

        /// <summary>
        /// Update role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        public async Task<Role> UpdateRole(Role role)
        {
            var applicationRole = await _roleRepository.GetRoleById(role.RoleId);
            applicationRole = _mapper.Map(role, applicationRole);
            var results = await _roleRepository.UpdateRole(applicationRole);
            return _mapper.Map<Role>(results);
        }

        /// <summary>
        /// Get role by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<Role> GetRoleByName(string name)
        {
            var results = await _roleRepository.GetRoleByName(name);
            return _mapper.Map<Role>(results);
        }

        /// <summary>
        /// Get current user roles
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<Role>> GetUserRoles(User currentUser)
        {
            var user = await _userBusiness.GetUserByEmail(currentUser.Email);
            var appRoles = await _roleRepository.GetUserRoles(_mapper.Map<ApplicationUser>(user));
            var roles = appRoles.Select(_mapper.Map<Role>).ToList();

            foreach (var role in roles)
            {
                role.Permissions = await _permissionBusiness.GetPermissionsByRole(role.RoleId);
            }

            return roles;
        }
    }
}