using System;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IAuditableEntity
    {
        /// <summary>
        /// created by
        /// </summary>
        long CreatedBy { get; set; }
        
        /// <summary>
        /// Updated by
        /// </summary>
        long UpdatedBy { get; set; }
        
        /// <summary>
        /// created date
        /// </summary>
        DateTime CreatedDate { get; set; }
        
        /// <summary>
        /// Updated date
        /// </summary>
        DateTime UpdatedDate { get; set; }
    }
}