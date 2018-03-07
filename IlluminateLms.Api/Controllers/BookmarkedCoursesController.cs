using System.Threading.Tasks;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    /// <summary>
    /// Bookmarked courses
    /// </summary>
    [Route("api/bookmark/courses")]
    [Produces("application/json")]
    [Authorize]
    public class BookmarkedCoursesController : Controller
    {
        private readonly BookmarkedCoursesBusiness _bookmarkedCoursesBusines;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="bookmarkedCoursesBusines"></param>
        public BookmarkedCoursesController(BookmarkedCoursesBusiness bookmarkedCoursesBusines)
        {
            _bookmarkedCoursesBusines = bookmarkedCoursesBusines;
        }

        /// <summary>
        /// Get all bookmarks
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllBookmarks()
        {
            var user = new User(User.Claims);
            var results = await _bookmarkedCoursesBusines.GetBookmarkedCoursesForUser(user.UserId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Create bookmark
        /// </summary>
        /// <param name="bookmark"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateBookmark([FromBody] BookmarkedCourse bookmark)
        {
            var user = new User(User.Claims);
            bookmark.User = user;
            var results = await _bookmarkedCoursesBusines.CreateBookmark(bookmark);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get bookmark by course id
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpGet("{courseId:long}")]
        public async Task<IActionResult> GetBookmarkByCourseId(long courseId)
        {
            var user = new User(User.Claims);
            var results = await _bookmarkedCoursesBusines.GetBookmarkByCourseId(courseId, user.UserId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Delete bookmark by course id
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpDelete("{courseId:long}")]
        public async Task<IActionResult> DeleteBookmarkByCourseId(long courseId)
        {
            var user = new User(User.Claims);
            var results = await _bookmarkedCoursesBusines.DeleteBookmarkByCourseId(courseId, user);
            return Ok(CommonResponse.Success(results));
        }
    }
}