using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Interfaces;

namespace IlluminateLms.Business.Business
{
    public class EnrollmentBusiness
    {
        private readonly IEnrollmentRepository _enrollmentRepository;
        private readonly UserBusiness _userBusiness;
        private readonly IMapper _mapper;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="enrollmentRepository"></param>
        /// <param name="userBusiness"></param>
        /// <param name="mapper"></param>
        public EnrollmentBusiness(IEnrollmentRepository enrollmentRepository, UserBusiness userBusiness, IMapper mapper)
        {
            _enrollmentRepository = enrollmentRepository;
            _userBusiness = userBusiness;
            _mapper = mapper;
        }

        /// <summary>
        /// Create enrollment
        /// </summary>
        /// <param name="enrollment"></param>
        /// <returns></returns>
        public async Task<Enrollment> CreateEnrollment(Enrollment enrollment)
        {
            var user = await _userBusiness.GetUserByEmail(enrollment.User.Email);

            if (user == null || !user.IsActive)
            {
                throw new Exception("User not found or active");
            }
            
            var results = await _enrollmentRepository.CreateEnrollment(_mapper.Map<Enterprise.Entities.Enrollment>(enrollment));
            return _mapper.Map<Enrollment>(results);
        }

        /// <summary>
        /// Get enrollments by course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public async Task<List<Enrollment>> GetEnrollmentsForCourse(long courseId)
        {
            var results = await _enrollmentRepository.GetEnrollmentsForCourse(courseId);
            return results.Select(_mapper.Map<Enrollment>).ToList();
        }

        /// <summary>
        /// Archive an enrollment
        /// </summary>
        /// <param name="enrollmentId"></param>
        /// <returns></returns>
        public async Task<bool> RemoveEnrollment(long enrollmentId)
        {
            return await _enrollmentRepository.ArchiveEnrollment(enrollmentId);
        }
    }
}