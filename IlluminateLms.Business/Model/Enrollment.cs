using System;

namespace IlluminateLms.Business.Model
{
    public class Enrollment
    {
        /// <summary>
        /// Enrollment id
        /// </summary>
        public long EnrollmentId { get; set; }
        
        /// <summary>
        /// Created date
        /// </summary>
        public DateTime CreatedDate { get; set; }
        
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
        public bool IsActive { get; set; }
        
        /// <summary>
        /// Is archived
        /// </summary>
        public bool IsArchived { get; set; }
        
        /// <summary>
        /// Timezone
        /// </summary>
        public string Timezone { get; set; }
        
        /// <summary>
        /// Course
        /// </summary>
        public Course Course { get; set; }
        
        /// <summary>
        /// Created by
        /// </summary>
        public User CreatedBy { get; set; }
        
        /// <summary>
        /// User
        /// </summary>
        public User User { get; set; }
    }
}