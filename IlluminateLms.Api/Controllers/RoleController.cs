using System.Threading.Tasks;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    [Route("api/role")]
    [Produces("application/json")]
    [Authorize]
    public class RoleController : Controller
    {
        private readonly RoleBusiness _roleBusiness;

        public RoleController(RoleBusiness roleBusiness)
        {
            _roleBusiness = roleBusiness;
        }

        /// <summary>
        /// Get all roles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Policy = ApplicationPermissions.ViewRolesPolicy)]
        public async Task<IActionResult> GetAllRoles()
        {
            var results = await _roleBusiness.GetAllRoles();
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Create role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Policy = ApplicationPermissions.CreateRolesPolicy)]
        public async Task<IActionResult> CreateRole([FromBody] Role role)
        {
            var results = await _roleBusiness.CreateRole(role);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get role by id
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet("{roleId:long}")]
        [Authorize(Policy = ApplicationPermissions.ViewRolesPolicy)]
        public async Task<IActionResult> GetRoleById(long roleId)
        {
            var results = await _roleBusiness.GetRoleById(roleId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Update role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [HttpPost("{roleId:long}")]
        [Authorize(Policy = ApplicationPermissions.UpdateRolesPolicy)]
        public async Task<IActionResult> UpdateRole([FromBody] Role role)
        {
            var results = await _roleBusiness.UpdateRole(role);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get current user roles
        /// </summary>
        /// <returns></returns>
        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentUserRoles()
        {
            var currentUser = new User(User.Claims);
            var results = await _roleBusiness.GetUserRoles(currentUser);
            return Ok(CommonResponse.Success(results));
        }
    }
}