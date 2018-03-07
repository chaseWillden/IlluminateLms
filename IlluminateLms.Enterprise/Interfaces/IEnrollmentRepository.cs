using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IEnrollmentRepository
    {
        Task<Enrollment> CreateEnrollment(Enrollment enrollment);
        Task<List<Enrollment>> GetEnrollmentsForCourse(long courseId);
        Task<bool> ArchiveEnrollment(long enrollmentId);
    }
}