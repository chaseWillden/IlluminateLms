using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Interfaces;

namespace IlluminateLms.Business.Business
{
    public class CourseBusiness
    {
        private readonly ICourseRepository _courseRepository;
        private readonly AccountBusiness _accountBusiness;
        private readonly IMapper _mapper;

        public CourseBusiness(ICourseRepository courseRepository, AccountBusiness accountBusiness, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _accountBusiness = accountBusiness;
            _mapper = mapper;
        }

        /// <summary>
        /// Create a new course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        public async Task<Course> CreateCourse(Course course)
        {
            if (course.Account == null || course.RootAccount == null)
            {
                var root = await _accountBusiness.GetRootAccount();
                if (course.Account == null) course.Account = root;
                if (course.RootAccount == null) course.RootAccount = root;
            }
            
            var entity = _mapper.Map<Enterprise.Entities.Course>(course);
            var results = await _courseRepository.CreateCourse(entity);
            return _mapper.Map<Course>(results);
        }

        /// <summary>
        /// Get course by id
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<Course> GetCourseById(long courseId)
        {
            var results = await _courseRepository.GetCourseById(courseId);
            return _mapper.Map<Course>(results);
        }

        /// <summary>
        /// Find a course
        /// </summary>
        /// <param name="q"></param>
        /// <returns></returns>
        public async Task<List<Course>> FindCourse(string q)
        {
            var courses = await _courseRepository.FindCourse(q);
            return courses.Select(_mapper.Map<Course>).ToList();
        }

        /// <summary>
        /// Get courses by account id
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<List<Course>> GetCoursesByAccountId(long accountId)
        {
            var courses = await _courseRepository.GetCoursesByAccountId(accountId);
            return courses.Select(_mapper.Map<Course>).ToList();
        }

        /// <summary>
        /// Archive course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<bool> ArchiveCourse(long courseId)
        {
            return await _courseRepository.ArchiveCourse(courseId);
        }

        /// <summary>
        /// Update course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        public async Task<Course> UpdateCourse(Course course)
        {
            var entity = _mapper.Map<Enterprise.Entities.Course>(course);
            var results = await _courseRepository.UpdateCourse(entity);
            return _mapper.Map<Course>(results);
        }
    }
}