namespace IlluminateLms.Business.Model
{
    public class BookmarkedCourse
    {
        /// <summary>
        /// Bookmarked course id
        /// </summary>
        public long BookmarkedCourseId { get; set; }
        
        /// <summary>
        /// Course
        /// </summary>
        public Course Course { get; set; }
        
        /// <summary>
        /// User
        /// </summary>
        public User User { get; set; }
    }
}