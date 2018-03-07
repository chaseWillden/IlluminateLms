using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Business.Business
{
    public class ContentItemBusiness
    {
        private readonly IContentItemRepository _contentItemRepository;
        private readonly IMapper _mapper;

        public ContentItemBusiness(IContentItemRepository contentItemRepository, IMapper mapper)
        {
            _contentItemRepository = contentItemRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Create content item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task<ContentItem> CreateContentItem(ContentItem item)
        {
            var results = await _contentItemRepository.CreateContentItem(_mapper.Map<Enterprise.Entities.ContentItem>(item));
            return _mapper.Map<ContentItem>(results);
        }

        /// <summary>
        /// Get content items for course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<List<ContentItem>> GetContentItemsForCourse(long courseId)
        {
            var results = await _contentItemRepository.GetContentItemsForCourse(courseId);
            return results.Select(_mapper.Map<ContentItem>).ToList();
        }

        /// <summary>
        /// Delete content item
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        public async Task<bool> DeleteContentItem(long contentItemId)
        {
            return await _contentItemRepository.DeleteContentItem(contentItemId);
        }

        /// <summary>
        /// Copy content item
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<ContentItem> CopyContentItem(long contentItemId)
        {
            var existing = await _contentItemRepository.GetContentItemById(contentItemId);
            if (existing == null) throw new Exception("Content item doesn't exist");
            var mapped = _mapper.Map<ContentItem>(existing);
            mapped.ContentItemId = default;
            mapped.Title += " (Copy)";
            return await CreateContentItem(mapped);
        }

        /// <summary>
        /// Renmae content item
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<ContentItem> RenameContentItem([FromBody] string name, long contentItemId)
        {
            if (string.IsNullOrEmpty(name)) throw new Exception("Name can't be empty");
            var item = await _contentItemRepository.RenameContentItem(contentItemId, name);
            return _mapper.Map<ContentItem>(item);
        }

        /// <summary>
        /// Update order
        /// </summary>
        /// <param name="contentItemIds"></param>
        /// <returns></returns>
        public async Task ReorderContentItems(List<long> contentItemIds)
        {
            for (var i = 0; i < contentItemIds.Count; i++)
            {
                await _contentItemRepository.UpdateOrder(contentItemIds[i], i);
            }
        }

        /// <summary>
        /// Get content item by id
        /// </summary>
        /// <param name="contentItemId"></param>
        /// <returns></returns>
        public async Task<ContentItem> GetContentItemById(long contentItemId)
        {
            var results = await _contentItemRepository.GetContentItemById(contentItemId);
            return _mapper.Map<ContentItem>(results);
        }
    }
}