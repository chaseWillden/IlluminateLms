using System.Threading.Tasks;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Api.Policies;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    [Route("api/course")]
    [Produces("application/json")]
    [Authorize]
    public class CourseController : Controller
    {
        private readonly CourseBusiness _courseBusiness;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="courseBusiness"></param>
        public CourseController(CourseBusiness courseBusiness)
        {
            _courseBusiness = courseBusiness;
        }

        /// <summary>
        /// Find course
        /// </summary>
        /// <param name="q"></param>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Policy = ApplicationPermissions.SearchCoursePolicy)]
        public async Task<IActionResult> FindCourse(string q)
        {
            if (q == null || q.Length <= 3)
            {
                return BadRequest(CommonResponse.Fail(
                    "Due to the volume of courses, the search term will need to be greater than 3 characters"));
            }
            
            var results = await _courseBusiness.FindCourse(q);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Find courses by account id
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        [HttpGet("account/{accountId:long}")]
        [Authorize(Policy = ApplicationPermissions.SearchCoursePolicy)]
        public async Task<IActionResult> GetCoursesByAccountId(long accountId)
        {
            var results = await _courseBusiness.GetCoursesByAccountId(accountId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Create course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Policy = ApplicationPermissions.CreateCoursePolicy)]
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            var results = await _courseBusiness.CreateCourse(course);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get course by id
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpGet("{courseId:long}")]
        [Authorize(Policy = ApplicationPermissions.ViewCoursePolicy)]
        public async Task<IActionResult> GetCourseById(long courseId)
        {
            var results = await _courseBusiness.GetCourseById(courseId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Archive a course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpDelete("{courseId:long}")]
        [Authorize(Policy = ApplicationPermissions.DeleteCoursePolicy)]
        public async Task<IActionResult> ArchiveCourse(long courseId)
        {
            var archived = await _courseBusiness.ArchiveCourse(courseId);
            return Ok(CommonResponse.Success(archived));
        }

        /// <summary>
        /// Update a course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        [HttpPost("update")]
        [Authorize(Policy = ApplicationPermissions.UpdateCoursePolicy)]
        public async Task<IActionResult> UpdateCourse([FromBody] Course course)
        {
            var results = await _courseBusiness.UpdateCourse(course);
            return Ok(CommonResponse.Success(results));
        }
    }
}