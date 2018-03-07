using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Primitives;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    /// <summary>
    /// Auth controller
    /// </summary>
    [Route("api/auth")]
    [Produces("application/json")]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TicketHelper _ticketHelper;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="signInManager"></param>
        /// <param name="ticketHelper"></param>
        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            TicketHelper ticketHelper
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _ticketHelper = ticketHelper;
        }

        /// <summary>
        /// Get auth token
        /// </summary>
        /// <example>
        ///     $.ajax({
        ///         method: "POST",
        ///         contentType: 'application/x-www-form-urlencoded',
        ///         url: '/api/auth/token',
        ///         data: ({
        ///             username: 'smithj@gmail.com',
        ///             password: 'PassWord1',
        ///             grant_type: 'password',
        ///             scope: 'openid email phone profile offline_access roles',
        ///             resource: window.location.origin
        ///         }),
        ///         success: function(data){
        ///         console.log(data)
        ///         }
        ///     })
        /// </example>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("token")]
        public async Task<IActionResult> Login(OpenIdConnectRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Username);
            
            if (user == null)
            {
                return BadRequest(CommonResponse.Fail("Invalid username or password"));
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded)
            {
                return BadRequest(CommonResponse.Fail("Invalid username or password"));
            }

            var ticket = await _ticketHelper.CreateTicketAsync(request, user);
            
            return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
        }
        
        /// <summary>
        /// Ping the server to check if stil authenticated
        /// </summary>
        /// <returns></returns>
        [HttpGet("ping")]
        [Authorize]
        public IActionResult Ping()
        {
            return Ok(CommonResponse.Success(true));
        }
    }
}
