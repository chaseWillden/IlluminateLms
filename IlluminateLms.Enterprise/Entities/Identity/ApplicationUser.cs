using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace IlluminateLms.Enterprise.Entities.Identity
{
    public class ApplicationUser : IdentityUser<long>, IAuditableEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SortableName { get; set; }
        public string DisplayName { get; set; }
        public string FullName { get; set; }
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string Avatar { get; set; }
        
        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        public virtual ICollection<IdentityUserRole<long>> Roles { get; set; }

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        public virtual ICollection<IdentityUserClaim<long>> Claims { get; set; }
    }
}