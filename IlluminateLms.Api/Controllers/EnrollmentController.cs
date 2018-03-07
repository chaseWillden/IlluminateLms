using System.Threading.Tasks;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    [Route("api/enrollment")]
    [Produces("application/json")]
    [Authorize]
    public class EnrollmentController : Controller
    {
        private readonly EnrollmentBusiness _enrollmentBusiness;

        public EnrollmentController(EnrollmentBusiness enrollmentBusiness)
        {
            _enrollmentBusiness = enrollmentBusiness;
        }

        /// <summary>
        /// Create enrollment
        /// </summary>
        /// <param name="enrollment"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Policy = ApplicationPermissions.AddEnrollmentsPolicy)]
        public async Task<IActionResult> AddEnrollmentsForCourse([FromBody] Enrollment enrollment)
        {
            var user = new User(User.Claims);
            enrollment.CreatedBy = user;
            var results = await _enrollmentBusiness.CreateEnrollment(enrollment);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Get enrollments for course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpGet("course/{courseId:long}")]
        [Authorize(Policy = ApplicationPermissions.ViewEnrollmentsPolicy)]
        public async Task<IActionResult> GetEnrollmentsForCourse(long courseId)
        {
            var results = await _enrollmentBusiness.GetEnrollmentsForCourse(courseId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Remove enrollment from course
        /// </summary>
        /// <param name="enrollmentId"></param>
        /// <returns></returns>
        [HttpDelete("{enrollmentId:long}")]
        [Authorize(Policy = ApplicationPermissions.DeleteEnrollmentsPolicy)]
        public async Task<IActionResult> RemoveEnrollment(long enrollmentId)
        {
            var results = await _enrollmentBusiness.RemoveEnrollment(enrollmentId);
            return Ok(CommonResponse.Success(results));
        }
    }
}