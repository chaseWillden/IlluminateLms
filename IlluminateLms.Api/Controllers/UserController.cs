using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IlluminateLms.Api.Controllers
{
    [Route("api/user")]
    [Produces("application/json")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly UserBusiness _userBusiness;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="userBusiness"></param>
        public UserController(UserBusiness userBusiness)
        {
            _userBusiness = userBusiness;
        }

        /// <summary>
        /// Get current user
        /// </summary>
        /// <returns></returns>
        [HttpGet("whoami")]
        public IActionResult GetWhoAmI()
        {
            return Ok(CommonResponse.Success(new User(User.Claims)));
        }

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Policy = ApplicationPermissions.ViewUsersPolicy)]
        public async Task<IActionResult> GetUsers()
        {
            var results = await _userBusiness.GetUsers();
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Create user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Policy = ApplicationPermissions.CreateUsersPolicy)]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            var results = await _userBusiness.CreateUser(user);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("{userId:long}")]
        [Authorize(Policy = ApplicationPermissions.ViewUsersPolicy)]
        public async Task<IActionResult> GetUserById(long userId)
        {
            var results = await _userBusiness.GetUserById(userId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("{userId:long}")]
        [Authorize(Policy = ApplicationPermissions.UpdateUsersPolicy)]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            var results = await _userBusiness.UpdateUser(user);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Update password
        /// </summary>
        /// <param name="password"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost("{userId:long}/password")]
        [Authorize(Policy = ApplicationPermissions.ResetUsersPasswordPolicy)]
        public async Task<IActionResult> Password([FromBody] string password, long userId)
        {
            var results = await _userBusiness.UpdatePassword(userId, password);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpDelete("{userId:long}")]
        [Authorize(Policy = ApplicationPermissions.DeleteUserPolicy)]
        public async Task<IActionResult> DeleteUser(long userId)
        {
            var results = await _userBusiness.DeleteUser(userId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet("email/{email}")]
        [Authorize(Policy = ApplicationPermissions.ViewUsersPolicy)]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var results = await _userBusiness.GetUserByEmail(email);
            return Ok(CommonResponse.Success(results));
        }
    }
}