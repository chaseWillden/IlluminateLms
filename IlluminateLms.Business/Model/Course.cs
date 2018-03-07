using System;

namespace IlluminateLms.Business.Model
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
        public string Name { get; set; }
        
        /// <summary>
        /// Course code
        /// </summary>
        public string CourseCode { get; set; }
        
        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }
        
        /// <summary>
        /// Start
        /// </summary>
        public DateTime Start { get; set; }
        
        /// <summary>
        /// End
        /// </summary>
        public DateTime End { get; set; }
        
        /// <summary>
        /// Is Public
        /// </summary>
        public bool IsPublic { get; set; }
        
        /// <summary>
        /// Is public to authenticated users
        /// </summary>
        public bool IsPublicToAuthUsers { get; set; }
        
        /// <summary>
        /// Public syllabus
        /// </summary>
        public bool PublicSyllabus { get; set; }
        
        /// <summary>
        /// Timezone
        /// </summary>
        public string TimeZone { get; set; }
        
        /// <summary>
        /// Is archived
        /// </summary>
        public bool IsArchived { get; set; }
        
        /// <summary>
        /// Parent course
        /// </summary>
        public Course ParentCourse { get; set; }
        
        /// <summary>
        /// Account
        /// </summary>
        public Account Account { get; set; }
        
        /// <summary>
        /// Root account
        /// </summary>
        public Account RootAccount { get; set; }
    }
}