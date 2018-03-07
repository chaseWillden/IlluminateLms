using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface ICourseRepository
    {
        Task<Course> CreateCourse(Course course);
        Task<Course> GetCourseById(long courseId);
        Task<List<Course>> FindCourse(string q);
        Task<List<Course>> GetCoursesByAccountId(long accountId);
        Task<bool> ArchiveCourse(long courseId);
        Task<Course> UpdateCourse(Course course);
        Task<Course> GetCourseByCode(string code);
    }
}