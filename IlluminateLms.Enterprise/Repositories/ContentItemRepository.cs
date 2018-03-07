using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IlluminateLms.Enterprise.Repositories
{
    public class ContentItemRepository : IContentItemRepository
    {
        private readonly IlluminateLmsContext _ctx;

        public ContentItemRepository(IlluminateLmsContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// Create new content item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task<ContentItem> CreateContentItem(ContentItem item)
        {
            item.CreatedById = item.CreatedBy.Id;
            item.CreatedBy = null;
            item.CreatedDate = DateTime.Now;
            item.CourseId = item.Course.CourseId;
            item.Course = null;
            item.IsArchived = false;
            
            await _ctx.ContentItems.AddAsync(item);
            await _ctx.SaveChangesAsync();
            return item;
        }

        /// <summary>
        /// Get content items for course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<List<ContentItem>> GetContentItemsForCourse(long courseId)
        {
            return await _ctx.ContentItems
                .Include(x => x.Course)
                .Include(x => x.CreatedBy)
                .OrderBy(x => x.Order)
                .Where(x => x.CourseId == courseId && !x.IsArchived)
                .ToListAsync();
        }

        /// <summary>
        /// Delete content item
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        public async Task<bool> DeleteContentItem(long contentItemId)
        {
            var entity = await _ctx.ContentItems.FirstOrDefaultAsync(x => x.ContentItemId == contentItemId);
            if (entity == null) throw new Exception("Content item doesn't exist");
            entity.IsArchived = true;
            await _ctx.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Get content item by id
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        public async Task<ContentItem> GetContentItemById(long contentItemId)
        {
            return await _ctx.ContentItems
                .Include(x => x.Course)
                .Include(x => x.CreatedBy)
                .FirstOrDefaultAsync(x => x.ContentItemId == contentItemId && !x.IsArchived);
        }

        /// <summary>
        /// Renmae content item
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<ContentItem> RenameContentItem(long contentItemId, string name)
        {
            var entity = await _ctx.ContentItems.FirstOrDefaultAsync(x => x.ContentItemId == contentItemId);
            if (entity == null) throw new Exception("Content item not found");
            entity.Title = name;
            await _ctx.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// Update order
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task UpdateOrder(long contentItemId, int order)
        {
            var entity = await _ctx.ContentItems.FirstOrDefaultAsync(x => x.ContentItemId == contentItemId);
            if (entity == null) throw new Exception("Content item not found");
            entity.Order = order;
            await _ctx.SaveChangesAsync();
        }
    }
}