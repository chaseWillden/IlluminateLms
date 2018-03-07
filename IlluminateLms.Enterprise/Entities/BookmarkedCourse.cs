using System.ComponentModel.DataAnnotations.Schema;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Enterprise.Entities
{
    public class BookmarkedCourse
    {
        /// <summary>
        /// Bookmarked course id
        /// </summary>
        public long BookmarkedCourseId { get; set; }
        
        /// <summary>
        /// Course id
        /// </summary>
        public long CourseId { get; set; }
        
        /// <summary>
        /// User Id
        /// </summary>
        public long UserId { get; set; }
        
        /// <summary>
        /// Course
        /// </summary>
        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}