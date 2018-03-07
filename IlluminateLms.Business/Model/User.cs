using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AspNet.Security.OpenIdConnect.Primitives;
using IlluminateLms.Enterprise.Helpers;

namespace IlluminateLms.Business.Model
{
    public class User
    {
        /// <summary>
        /// User id
        /// </summary>
        public long UserId { get; set; }
        
        /// <summary>
        /// First Name
        /// </summary>
        public string FirstName { get; set; }
        
        /// <summary>
        /// Last name
        /// </summary>
        public string LastName { get; set; }
        
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        
        /// <summary>
        /// Sortable name
        /// </summary>
        public string SortableName { get; set; }
        
        /// <summary>
        /// Display name
        /// </summary>
        public string DisplayName { get; set; }
        
        /// <summary>
        /// Full name
        /// </summary>
        public string FullName { get; set; }
        
        /// <summary>
        /// Is active
        /// </summary>
        public bool IsActive { get; set; }
        
        /// <summary>
        /// Username
        /// </summary>
        public string UserName { get; set; }
        
        /// <summary>
        /// Avatar
        /// </summary>
        public string Avatar { get; set; }
        
        public User() {}

        public User(IEnumerable<Claim> userClaims)
        {
            var claims = userClaims as Claim[] ?? userClaims.ToArray();
            FirstName = claims.FirstOrDefault(x => x.Type == CustomClaimTypes.FirstName)?.Value;
            LastName = claims.FirstOrDefault(x => x.Type == CustomClaimTypes.LastName)?.Value;
            Email = claims.FirstOrDefault(x => x.Type == CustomClaimTypes.Email)?.Value;
            var id = claims.FirstOrDefault(x => x.Type == OpenIdConnectConstants.Claims.Subject)?.Value;
            if (id != null)
            {
                UserId = long.Parse(id);
            }
        }
    }
}