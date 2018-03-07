using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IlluminateLms.Enterprise.Entities
{
    public class Course
    {
        /// <summary>
        /// Course Id
        /// </summary>
        public long CourseId { get; set; }
        
        /// <summary>
        /// Name
        /// </summary>
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        
        /// <summary>
        /// Course code
        /// </summary>
        [StringLength(30)]
        [Required]
        public string CourseCode { get; set; }
        
        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }
        
        /// <summary>
        /// Account Id
        /// </summary>
        [Required]
        public long AccountId { get; set; }
        
        /// <summary>
        /// Root account id
        /// </summary>
        [Required]
        public long RootAccountId { get; set; }
        
        /// <summary>
        /// Start
        /// </summary>
        public DateTime? Start { get; set; }
        
        /// <summary>
        /// End
        /// </summary>
        public DateTime? End { get; set; }
        
        /// <summary>
        /// Is Public
        /// </summary>
        [DefaultValue(false)]
        public bool IsPublic { get; set; }
        
        /// <summary>
        /// Is public to authenticated users
        /// </summary>
        [DefaultValue(false)]
        public bool IsPublicToAuthUsers { get; set; }
        
        /// <summary>
        /// Public syllabus
        /// </summary>
        [DefaultValue(false)]
        public bool PublicSyllabus { get; set; }
        
        /// <summary>
        /// Is archived
        /// </summary>
        [DefaultValue(false)]
        public bool IsArchived { get; set; }
        
        /// <summary>
        /// Timezone
        /// </summary>
        [DefaultValue("America/Denver")]
        public string TimeZone { get; set; }
        
        /// <summary>
        /// Parent course id
        /// </summary>
        public long? ParentCourseId { get; set; }
        
        /// <summary>
        /// Parent course
        /// </summary>
        [ForeignKey("ParentCourseId")]
        public Course ParentCourse { get; set; }
        
        /// <summary>
        /// Account
        /// </summary>
        [ForeignKey("AccountId")]
        public Account Account { get; set; }
        
        /// <summary>
        /// Root account
        /// </summary>
        [ForeignKey("RootAccountId")]
        public Account RootAccount { get; set; }
    }
}