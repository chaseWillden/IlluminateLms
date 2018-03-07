using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IlluminateLms.Enterprise.Repositories
{
    public class EnrollmentRepository : IEnrollmentRepository
    {
        private readonly IlluminateLmsContext _ctx;

        public EnrollmentRepository(IlluminateLmsContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// Create Enrollment
        /// </summary>
        /// <param name="enrollment"></param>
        /// <returns></returns>
        public async Task<Enrollment> CreateEnrollment(Enrollment enrollment)
        {
            var exists = await _ctx.Enrollments.FirstOrDefaultAsync(x =>
                x.UserId == enrollment.User.Id 
                && x.CourseId == enrollment.Course.CourseId
                && !x.IsArchived);

            if (exists != null)
            {
                throw new Exception("Enrollment already exists");
            }
            
            enrollment.CourseId = enrollment.Course.CourseId;
            enrollment.CreatedById = enrollment.CreatedBy.Id;
            enrollment.UserId = enrollment.User.Id;
            enrollment.Course = null;
            enrollment.CreatedBy = null;
            enrollment.User = null;
            enrollment.CreatedDate = DateTime.Now;
            await _ctx.Enrollments.AddAsync(enrollment);
            await _ctx.SaveChangesAsync();
            return enrollment;
        }

        /// <summary>
        /// Get enrollments by course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<List<Enrollment>> GetEnrollmentsForCourse(long courseId)
        {
            return await _ctx.Enrollments
                .Include(x => x.Course)
                .Include(x => x.CreatedBy)
                .Include(x => x.User)
                .Where(x => x.CourseId == courseId && !x.IsArchived)
                .ToListAsync();
        }

        /// <summary>
        /// Archive an enrollment
        /// </summary>
        /// <param name="enrollmentId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> ArchiveEnrollment(long enrollmentId)
        {
            var entity = await _ctx.Enrollments.FirstOrDefaultAsync(x => x.EnrollmentId == enrollmentId);
            if (entity == null) throw new Exception("Enrollment not found");
            entity.IsArchived = true;
            await _ctx.SaveChangesAsync();
            return true;
        }
    }
}