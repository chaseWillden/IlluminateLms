using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IlluminateLms.Enterprise.Entities
{
    public class Account
    {
        /// <summary>
        /// Account Id
        /// </summary>
        public long AccountId { get; set; }
        
        /// <summary>
        /// Account name
        /// </summary>
        [StringLength(250)]
        public string Name { get; set; }
        
        /// <summary>
        /// Parent account
        /// </summary>
        public long? ParentAccountId { get; set; }
        
        /// <summary>
        /// Is archived
        /// </summary>
        [DefaultValue(false)]
        public bool IsArchived { get; set; }
        
        /// <summary>
        /// Is root account
        /// </summary>
        [DefaultValue(false)]
        public bool IsRoot { get; set; }
        
        /// <summary>
        /// Default time zone
        /// </summary>
        [StringLength(75)]
        [DefaultValue("America/Denver")]
        public string DefaultTimeZone { get; set; }
        
        /// <summary>
        /// Parent Account object
        /// </summary>
        [ForeignKey("ParentAccountId")]
        public Account ParentAccount { get; set; } 
    }
}