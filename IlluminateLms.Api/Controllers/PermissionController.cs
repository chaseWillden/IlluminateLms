using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    [Route("api/permission")]
    [Produces("application/json")]
    [Authorize]
    public class PermissionController : Controller
    {
        private readonly PermissionBusiness _permissionBusiness;

        public PermissionController(PermissionBusiness permissionBusiness)
        {
            _permissionBusiness = permissionBusiness;
        }

        /// <summary>
        /// Get all permissions
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAllPermissions()
        {
            var results = _permissionBusiness.GetAllPermissions();
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get permissions for role
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet("role/{roleId:long}")]
        public async Task<IActionResult> GetPermissionForRole(long roleId)
        {
            var results = await _permissionBusiness.GetPermissionsByRole(roleId);
            return Ok(CommonResponse.Success(results)); 
        }

        /// <summary>
        /// Add permissions to a role
        /// </summary>
        /// <param name="permissions"></param>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpPost("role/{roleId:long}")]
        public async Task<IActionResult> AddPermissions([FromBody] List<Permission> permissions, long roleId)
        {
            var results = await _permissionBusiness.AddPermissionsToRole(roleId, permissions);
            return Ok(CommonResponse.Success(results)); 
        }
    }
}