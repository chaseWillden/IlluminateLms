using System;
using System.ComponentModel.DataAnnotations.Schema;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Enterprise.Entities
{
    public class ContentItem
    {
        /// <summary>
        /// Content item id
        /// </summary>
        public long ContentItemId { get; set; }
        
        /// <summary>
        /// Title
        /// </summary>
        public string Title { get; set; }
        
        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }
        
        /// <summary>
        /// Created by id
        /// </summary>
        public long CreatedById { get; set; }
        
        /// <summary>
        /// Created date
        /// </summary>
        public DateTime CreatedDate { get; set; }
        
        /// <summary>
        /// Course id
        /// </summary>
        public long CourseId { get; set; }
        
        /// <summary>
        /// Order
        /// </summary>
        public int Order { get; set; }
        
        /// <summary>
        /// Is archived
        /// </summary>
        public bool IsArchived { get; set; }
        
        /// <summary>
        /// Start date
        /// </summary>
        public DateTime StartDate { get; set; }
        
        /// <summary>
        /// End Date
        /// </summary>
        public DateTime EndDate { get; set; }
        
        /// <summary>
        /// Start visibility date
        /// </summary>
        public DateTime StartVisibilityDate { get; set; }
        
        /// <summary>
        /// End visibility Date
        /// </summary>
        public DateTime EndVisibilityDate { get; set; }
        
        /// <summary>
        /// Created by
        /// </summary>
        [ForeignKey("CreatedById")]
        public ApplicationUser CreatedBy { get; set; }
        
        /// <summary>
        /// Course
        /// </summary>
        [ForeignKey("CourseId")]
        public Course Course { get; set; }
    }
}