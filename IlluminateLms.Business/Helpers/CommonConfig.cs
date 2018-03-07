using AutoMapper;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Interfaces;
using IlluminateLms.Enterprise.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Account = IlluminateLms.Business.Model.Account;
using BookmarkedCourse = IlluminateLms.Business.Model.BookmarkedCourse;
using Course = IlluminateLms.Business.Model.Course;
using Enrollment = IlluminateLms.Business.Model.Enrollment;

namespace IlluminateLms.Business.Helpers
{
    public class CommonConfig
    {
        public static void ConfigServices(IServiceCollection services)
        {
            // Repositories
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<IBookmarkedCourseRepository, BookmarkedCourseRepository>();
            services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
            services.AddScoped<IPermissionRepository, PermissionRepository>();
            services.AddScoped<IContentItemRepository, ContentItemRepository>();
            
            // Business
            services.AddScoped<AccountBusiness>();
            services.AddScoped<CourseBusiness>();
            services.AddScoped<BookmarkedCoursesBusiness>();
            services.AddScoped<UserBusiness>();
            services.AddScoped<EnrollmentBusiness>();
            services.AddScoped<RoleBusiness>();
            services.AddScoped<PermissionBusiness>();
            services.AddScoped<ContentItemBusiness>();
        }
    }
}