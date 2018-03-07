using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Enterprise.Entities
{
    public class Enrollment
    {
        /// <summary>
        /// Enrollment id
        /// </summary>
        public long EnrollmentId { get; set; }
        
        /// <summary>
        /// User Id
        /// </summary>
        public long UserId { get; set; }
        
        /// <summary>
        /// Created by id
        /// </summary>
        public long CreatedById { get; set; }
        
        /// <summary>
        /// Created date
        /// </summary>
        public DateTime CreatedDate { get; set; }
        
        /// <summary>
        /// Course id
        /// </summary>
        public long CourseId { get; set; }
        
        /// <summary>
        /// Start
        /// </summary>
        public DateTime? Start { get; set; }
        
        /// <summary>
        /// End
        /// </summary>
        public DateTime? End { get; set; }
        
        /// <summary>
        /// Is active
        /// </summary>
        [DefaultValue(true)]
        public bool IsActive { get; set; }
        
        /// <summary>
        /// Is archived
        /// </summary>
        [DefaultValue(false)]
        public bool IsArchived { get; set; }
        
        /// <summary>
        /// Timezone
        /// </summary>
        [DefaultValue("America/Denver")]
        public string Timezone { get; set; }
        
        /// <summary>
        /// Course
        /// </summary>
        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        
        /// <summary>
        /// Created by
        /// </summary>
        [ForeignKey("CreatedById")]
        public ApplicationUser CreatedBy { get; set; }
        
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}