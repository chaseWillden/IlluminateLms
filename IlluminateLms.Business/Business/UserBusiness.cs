using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IlluminateLms.Business.Business
{
    public class UserBusiness
    {
        private readonly IMapper _mapper;
        private readonly ILogger<UserBusiness> _logger;
        private readonly IUserRepository _userRepository;

        public UserBusiness( 
            IMapper mapper, 
            ILogger<UserBusiness> logger,
            IUserRepository userRepository
        )
        {
            _mapper = mapper;
            _logger = logger;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Get users
        /// </summary>
        /// <returns></returns>
        public async Task<List<User>> GetUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return users.Select(_mapper.Map<User>).ToList();
        }

        /// <summary>
        /// Create user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<User> CreateUser(User user)
        {
            var exists = await _userRepository.GetUserByEmail(user.Email);
            // Activate is email already exists
            if (exists != null)
            {
                exists.IsActive = true;
                var updated = await _userRepository.UpdateUser(exists);
                return _mapper.Map<User>(updated);
            }
            
            user.IsActive = true;
            var created = await _userRepository.CreateUser(_mapper.Map<ApplicationUser>(user));
            return _mapper.Map<User>(created);
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<User> GetUserById(long userId)
        {
            var results = await _userRepository.GetUserById(userId);
            return _mapper.Map<User>(results);
        }

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<User> UpdateUser(User user)
        {
            var applicationUser = await _userRepository.GetUserById(user.UserId);
            applicationUser = _mapper.Map(user, applicationUser);
            var results = await _userRepository.UpdateUser(applicationUser);
            return _mapper.Map<User>(results);
        }

        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<User> DeleteUser(long userId)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user.FirstName == "__TEST__")
            {
                var removed = await _userRepository.DeleteUser(_mapper.Map<ApplicationUser>(user));
                if (!removed) throw new Exception("Unable to delete test user");
            }
            user.IsActive = false;
            var results = await _userRepository.UpdateUser(user);
            return _mapper.Map<User>(results);
        }

        /// <summary>
        /// Update password
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<object> UpdatePassword(long userId, string password)
        {
            var user = await _userRepository.GetUserById(userId);
            return await _userRepository.UpdatePassword(user, password);
        }

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetUserByEmail(email);
            return _mapper.Map<User>(user);
        }
    }
}