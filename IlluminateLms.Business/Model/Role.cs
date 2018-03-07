using System.Collections.Generic;

namespace IlluminateLms.Business.Model
{
    public class Role
    {
        /// <summary>
        /// Role id
        /// </summary>
        public long RoleId { get; set; }
        
        /// <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }
        
        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }
        
        /// <summary>
        /// Permissions
        /// </summary>
        public List<Permission> Permissions { get; set; }
    }
}