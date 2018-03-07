using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IBookmarkedCourseRepository
    {
        Task<BookmarkedCourse> CreateBookmark(BookmarkedCourse bookmark);
        Task<List<BookmarkedCourse>> GetBookmarkedCoursesForUser(long userId);
        Task<BookmarkedCourse> GetBookmarkByCourseId(long courseId, long userId);
        Task<bool> DeleteBookmarkByCourseId(long courseId, long userId);
    }
}