using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IContentItemRepository
    {
        Task<ContentItem> CreateContentItem(ContentItem item);
        Task<List<ContentItem>> GetContentItemsForCourse(long courseId);
        Task<bool> DeleteContentItem(long contentItemId);
        Task<ContentItem> GetContentItemById(long contentItemId);
        Task<ContentItem> RenameContentItem(long contentItemId, string name);
        Task UpdateOrder(long contentItemId, int order);
    }
}