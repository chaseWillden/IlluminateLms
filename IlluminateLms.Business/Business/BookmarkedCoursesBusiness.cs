using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Interfaces;

namespace IlluminateLms.Business.Business
{
    public class BookmarkedCoursesBusiness
    {
        private readonly IBookmarkedCourseRepository _bookmarkedCourseRepository;
        private readonly IMapper _mapper;

        public BookmarkedCoursesBusiness(IBookmarkedCourseRepository bookmarkedCourseRepository, IMapper mapper)
        {
            _bookmarkedCourseRepository = bookmarkedCourseRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Create bookmark
        /// </summary>
        /// <param name="bookmark"></param>
        /// <returns></returns>
        public async Task<BookmarkedCourse> CreateBookmark(BookmarkedCourse bookmark)
        {
            var existingBookmarks = await GetBookmarkedCoursesForUser(bookmark.User.UserId);
            if (existingBookmarks.Any(x => x.Course.CourseId == bookmark.Course.CourseId))
            {
                return null;
            }
            
            var entity = _mapper.Map<Enterprise.Entities.BookmarkedCourse>(bookmark);
            var results = await _bookmarkedCourseRepository.CreateBookmark(entity);
            return _mapper.Map<BookmarkedCourse>(results);
        }

        /// <summary>
        /// Get all bookmarked courses for user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<List<BookmarkedCourse>> GetBookmarkedCoursesForUser(long userId)
        {
            var results = await _bookmarkedCourseRepository.GetBookmarkedCoursesForUser(userId);
            return results.Select(_mapper.Map<BookmarkedCourse>).ToList();
        }

        /// <summary>
        /// Get bookmark by course id
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<BookmarkedCourse> GetBookmarkByCourseId(long courseId, long userId)
        {
            var results = await _bookmarkedCourseRepository.GetBookmarkByCourseId(courseId, userId);
            return _mapper.Map<BookmarkedCourse>(results);
        }

        /// <summary>
        /// Delete bookmark by course id
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<object> DeleteBookmarkByCourseId(long courseId, User user)
        {
            return await _bookmarkedCourseRepository.DeleteBookmarkByCourseId(courseId, user.UserId);
        }
    }
}