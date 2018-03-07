using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;

namespace IlluminateLms.Enterprise.Repositories
{
    public class BookmarkedCourseRepository : IBookmarkedCourseRepository
    {
        private readonly IlluminateLmsContext _ctx;

        public BookmarkedCourseRepository(IlluminateLmsContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// Create bookmark
        /// </summary>
        /// <param name="bookmark"></param>
        /// <returns></returns>
        public async Task<BookmarkedCourse> CreateBookmark(BookmarkedCourse bookmark)
        {
            bookmark.CourseId = bookmark.Course.CourseId;
            bookmark.Course = null;
            bookmark.UserId = bookmark.User.Id;
            bookmark.User = null;
            
            await _ctx.BookmarkedCourses.AddAsync(bookmark);
            await _ctx.SaveChangesAsync();

            return await _ctx.BookmarkedCourses
                .Include(x => x.Course)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.BookmarkedCourseId == bookmark.BookmarkedCourseId);
        }

        /// <summary>
        /// Get bookmarked courses for user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<List<BookmarkedCourse>> GetBookmarkedCoursesForUser(long userId)
        {
            return await _ctx.BookmarkedCourses
                .Include(x => x.Course)
                .Include(x => x.User)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        /// <summary>
        /// Get bookmark by course id
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<BookmarkedCourse> GetBookmarkByCourseId(long courseId, long userId)
        {
            return await _ctx.BookmarkedCourses
                .Include(x => x.Course)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.CourseId == courseId && x.UserId == userId);
        }

        /// <summary>
        /// Delete bookmark by course id
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<bool> DeleteBookmarkByCourseId(long courseId, long userId)
        {
            var entity = await _ctx.BookmarkedCourses.FirstOrDefaultAsync(x => x.CourseId == courseId && x.UserId == userId);
            _ctx.BookmarkedCourses.Remove(entity);
            await _ctx.SaveChangesAsync();
            return true;
        }
    }
}