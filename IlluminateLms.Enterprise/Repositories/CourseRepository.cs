using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IlluminateLms.Enterprise.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly IlluminateLmsContext _ctx;

        public CourseRepository(IlluminateLmsContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// Create a new course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        public async Task<Course> CreateCourse(Course course)
        {
            course.AccountId = course.Account.AccountId;
            course.Account = null;

            course.RootAccountId = course.RootAccount.AccountId;
            course.RootAccount = null;
            
            await _ctx.Courses.AddAsync(course);
            await _ctx.SaveChangesAsync();
            return course;
        }

        /// <summary>
        /// Get course by id
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<Course> GetCourseById(long courseId)
        {
            return await _ctx.Courses
                .Include(x => x.Account)
                .Include(x => x.ParentCourse)
                .Include(x => x.RootAccount)
                .FirstOrDefaultAsync(x => x.CourseId == courseId);
        }

        /// <summary>
        /// Find courses within a certain search parameter
        /// </summary>
        /// <param name="q"></param>
        /// <returns></returns>
        public async Task<List<Course>> FindCourse(string q)
        {
            return await _ctx.Courses
                .Include(x => x.Account)
                .Include(x => x.ParentCourse)
                .Include(x => x.RootAccount)
                .Where(x => (x.Name.ToLower().Contains(q) ||
                             x.CourseCode.ToLower().Contains(q) ||
                             x.CourseId.ToString().Contains(q)) && 
                            !x.IsArchived)
                .ToListAsync();
        }

        /// <summary>
        /// Get courses by account id
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<List<Course>> GetCoursesByAccountId(long accountId)
        {
            return await _ctx.Courses
                .Include(x => x.Account)
                .Include(x => x.ParentCourse)
                .Include(x => x.RootAccount)
                .Where(x => !x.IsArchived && x.AccountId == accountId)
                .ToListAsync();
        }

        /// <summary>
        /// Archive course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<bool> ArchiveCourse(long courseId)
        {
            var course = await _ctx.Courses.FirstOrDefaultAsync(x => x.CourseId == courseId);
            if (course == null) return false;

            if (course.Name == "__TEST__")
            {
                _ctx.Courses.Remove(course);
            }
            else course.IsArchived = true;
            
            await _ctx.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Update course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        public async Task<Course> UpdateCourse(Course course)
        {
            if (course.Account != null) course.AccountId = course.Account.AccountId;
            if (course.RootAccount != null) course.RootAccountId = course.RootAccount.AccountId;
            if (course.ParentCourse != null) course.ParentCourseId = course.ParentCourse.CourseId;
            course.Account = null;
            course.ParentCourse = null;
            course.RootAccount = null;
            
            _ctx.Entry(course).State = EntityState.Modified;
            await _ctx.SaveChangesAsync();
            return course;
        }

        /// <summary>
        /// Get course by code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public async Task<Course> GetCourseByCode(string code)
        {
            return await _ctx.Courses.FirstOrDefaultAsync(x => x.CourseCode == code);
        }
    }
}