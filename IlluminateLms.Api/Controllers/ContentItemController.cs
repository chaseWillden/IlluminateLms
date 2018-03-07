using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Api.Helpers;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Api.Controllers
{
    [Route("api/contentitem")]
    [Produces("application/json")]
    [Authorize]
    public class ContentItemController : Controller
    {
        private readonly ContentItemBusiness _contentItemBusiness;
        private readonly CourseBusiness _courseBusiness;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="contentItemBusiness"></param>
        /// <param name="courseBusiness"></param>
        public ContentItemController(ContentItemBusiness contentItemBusiness, CourseBusiness courseBusiness)
        {
            _contentItemBusiness = contentItemBusiness;
            _courseBusiness = courseBusiness;
        }

        /// <summary>
        /// Get content items for course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpGet("{courseId:long}/course")]
        public async Task<IActionResult> GetContentItems(long courseId)
        {
            var results = await _contentItemBusiness.GetContentItemsForCourse(courseId);
            return Ok(CommonResponse.Success(results));
        }
        
        /// <summary>
        /// Get content item by id
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        [HttpGet("{contentItemId:long}")]
        public async Task<IActionResult> GetContentItemById(long contentItemId)
        {
            var results = await _contentItemBusiness.GetContentItemById(contentItemId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Create content item
        /// </summary>
        /// <param name="item"></param>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpPost("{courseId:long}")]
        public async Task<IActionResult> CreateContentItem([FromBody] ContentItem item, long courseId)
        {
            var user = new User(User.Claims);
            item.CreatedBy = user;
            item.Course = await _courseBusiness.GetCourseById(courseId);
            var results = await _contentItemBusiness.CreateContentItem(item);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Delete content item
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        [HttpDelete("{contentItemId:long}")]
        public async Task<IActionResult> DeleteContentItem(long contentItemId)
        {
            var results = await _contentItemBusiness.DeleteContentItem(contentItemId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Copy content item
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        [HttpPost("{contentItemId:long}/copy")]
        public async Task<IActionResult> CopyContentItem(long contentItemId)
        {
            var results = await _contentItemBusiness.CopyContentItem(contentItemId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Renmae content item
        /// </summary>
        /// <param name="name"></param>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        [HttpPost("{contentItemId:long}/rename")]
        public async Task<IActionResult> RenameContentItem([FromBody] string name, long contentItemId)
        {
            var results = await _contentItemBusiness.RenameContentItem(name, contentItemId);
            return Ok(CommonResponse.Success(results));
        }

        /// <summary>
        /// Reorder content items
        /// </summary>
        /// <param name="contentItemIds"></param>
        /// <returns></returns>
        [HttpPost("reorder")]
        public async Task<IActionResult> ReorderContentItems([FromBody] List<long> contentItemIds)
        {
            await _contentItemBusiness.ReorderContentItems(contentItemIds);
            return Ok(CommonResponse.Success(true));
        }
    }
}