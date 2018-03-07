using System.Threading.Tasks;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    [Route("api/account")]
    [Produces("application/json")]
    [Authorize]
    public class AccountController : Controller
    {
        private readonly AccountBusiness _accountBusiness;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="accountBusiness"></param>
        public AccountController(AccountBusiness accountBusiness)
        {
            _accountBusiness = accountBusiness;
        }

        /// <summary>
        /// Create accounts
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            var results = await _accountBusiness.CreateAccount(account);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get all accounts
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            var results = await _accountBusiness.GetAllAccounts();
            return Ok(CommonResponse.Success(results));
        }
        
        /// <summary>
        /// Get account by id
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        [HttpGet("{accountId:long}")]
        public async Task<IActionResult> GetAccountById(long accountId)
        {
            var result = await _accountBusiness.GetAccountById(accountId);
            return Ok(CommonResponse.Success(result));
        }
        
        /// <summary>
        /// Get children accounts
        /// </summary>
        /// <param name="parentAccountId"></param>
        /// <returns></returns>
        [HttpGet("{parentAccountId:long}/children")]
        public async Task<IActionResult> GetChildrenAccounts(long parentAccountId)
        {
            var result = await _accountBusiness.GetChildrenAccounts(parentAccountId);
            return Ok(CommonResponse.Success(result));
        }

        /// <summary>
        /// Get root account
        /// </summary>
        /// <returns></returns>
        [HttpGet("root")]
        public async Task<IActionResult> GetRootAccount()
        {
            var result = await _accountBusiness.GetRootAccount();
            return Ok(CommonResponse.Success(result));
        }

        /// <summary>
        /// Archive an account
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        [HttpDelete("{accountId:long}")]
        public async Task<IActionResult> ArchiveAccount(long accountId)
        {
            var result = await _accountBusiness.ArchiveAnAccount(accountId);
            return Ok(CommonResponse.Success(result));
        }

        /// <summary>
        /// Update an account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        [HttpPost("{accountId:long}/update")]
        public async Task<IActionResult> UpdateAnAccount([FromBody] Account account)
        {
            var result = await _accountBusiness.UpdateAccount(account);
            return Ok(CommonResponse.Success(result));
        }
    }
}