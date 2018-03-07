using System.Linq;
using System.Threading.Tasks;
using IlluminateLms.Business.Constants;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;
using IlluminateLms.Enterprise.Helpers;
using IlluminateLms.Enterprise.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IlluminateLms.Enterprise.Utilities
{
    public class IlluminateLmsDatabaseInitalizer : IIlluminateLmsDatabaseInitalizer
    {
        private readonly ILogger<IlluminateLmsDatabaseInitalizer> _logger;
        private readonly IAccountRepository _accountRepository;
        private readonly IlluminateLmsContext _ctx;
        private readonly IRoleRepository _roleRepository;
        private readonly IUserRepository _userRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPermissionRepository _permissionRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IEnrollmentRepository _enrollmentRepository;
        private readonly IBookmarkedCourseRepository _bookmarkedCourseRepository;

        public IlluminateLmsDatabaseInitalizer(
            ILogger<IlluminateLmsDatabaseInitalizer> logger,
            IAccountRepository accountRepository,
            IlluminateLmsContext ctx,
            IRoleRepository roleRepository,
            IUserRepository userRepository,
            UserManager<ApplicationUser> userManager,
            IPermissionRepository permissionRepository,
            ICourseRepository courseRepository,
            IEnrollmentRepository enrollmentRepository,
            IBookmarkedCourseRepository bookmarkedCourseRepository
            )
        {
            _logger = logger;
            _accountRepository = accountRepository;
            _ctx = ctx;
            _roleRepository = roleRepository;
            _userRepository = userRepository;
            _userManager = userManager;
            _permissionRepository = permissionRepository;
            _courseRepository = courseRepository;
            _enrollmentRepository = enrollmentRepository;
            _bookmarkedCourseRepository = bookmarkedCourseRepository;
        }
        
        /// <summary>
        /// Load the database with built in data
        /// </summary>
        /// <returns></returns>
        public async Task SeedAsync()
        {
            
            await _ctx.Database.EnsureCreatedAsync();
            
            var accounts = await _accountRepository.GetAllAccounts();
            if (accounts.Count == 0)
            {
                await EnsureAccount("All Accounts");
            }

            if (!await _ctx.Users.AnyAsync())
            {
                _logger.LogInformation("Generating built in user accounts");
                await EnsureRoleAsync(Roles.Admin, "Administrator has access to all courses, users, and other parts of the application", ApplicationPermissions.GetAllPermissionValues());
                await EnsureUserAsync("Admin", "Smith", "admin@illuminatelms.com", true, "PassWord1", new[]{Roles.Admin});
                _logger.LogInformation("Built in user accounts generated");
                
                await EnsureCourseAsync("Welcome to Illuminate Lms", "Illuminate Lms 101", "An introduction course to Illuminate Lms");
                _logger.LogInformation("Enrolled users");
                
                _logger.LogInformation("Bookmarking course");
                await EnsureBookmarkAsync();
                _logger.LogInformation("Bookmark created");
            }
        }

        /// <summary>
        /// Create bookmarks
        /// </summary>
        /// <returns></returns>
        private async Task EnsureBookmarkAsync()
        {
            var user = await _userRepository.GetUserByEmail("admin@illuminatelms.com");
            var bookmarks = await _bookmarkedCourseRepository.GetBookmarkedCoursesForUser(user.Id);
            if (bookmarks.Count == 0)
            {
                var course = await _courseRepository.GetCourseByCode("Illuminate Lms 101");
                var bookmark = new BookmarkedCourse
                {
                    User = user,
                    Course = course
                };
                await _bookmarkedCourseRepository.CreateBookmark(bookmark);   
            }
        }

        /// <summary>
        /// Create an account
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private async Task EnsureAccount(string name)
        {
            var account = await _accountRepository.CreateAccount(new Account
            {
                Name = name, 
                IsRoot = true
            });

            if (account == null)
            {
                
            }
            else
            {
                await _accountRepository.UpdateAccount(account);
            }
        }

        /// <summary>
        /// Create a role
        /// </summary>
        /// <param name="roleName"></param>
        /// <param name="description"></param>
        /// <param name="claims"></param>
        /// <returns></returns>
        private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
        {
            if (await _roleRepository.GetRoleByName(roleName) == null){
                var role = new ApplicationRole
                {
                    Name = roleName,
                    Description = description,
                    IsActive = true
                };
                await _roleRepository.CreateRole(role);
                await _permissionRepository.AddPermissionsToRole(role, claims.Select(ApplicationPermissions.GetPermissionByValue).ToList());
            }
        }

        /// <summary>
        /// Create an user
        /// </summary>
        /// <param name="firstname"></param>
        /// <param name="lastname"></param>
        /// <param name="email"></param>
        /// <param name="isActive"></param>
        /// <param name="password"></param>
        /// <param name="roles"></param>
        /// <returns></returns>
        private async Task<ApplicationUser> EnsureUserAsync(string firstname, string lastname, string email,
            bool isActive, string password, string[] roles)
        {
            var user = new ApplicationUser
            {
                UserName = email,
                FirstName = firstname,
                LastName = lastname,
                Email = email,
                IsActive = isActive,
                SortableName = lastname + ", " + firstname,
                DisplayName = firstname + " " + lastname,
                FullName = firstname + " " + lastname
            };

            await _userManager.CreateAsync(user);
            await _userRepository.UpdatePassword(user, password);
            await _roleRepository.AddRolesToUser(user, roles.ToList());

            return user;
        }

        /// <summary>
        /// Create a course
        /// </summary>
        /// <param name="name"></param>
        /// <param name="code"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        private async Task EnsureCourseAsync(string name, string code, string description)
        {
            var root = await _accountRepository.GetRootAccount();
            var user = await _userRepository.GetUserByEmail("admin@illuminatelms.com");
            var course = new Course
            {
                Account = root,
                RootAccount = root,
                Name = name,
                CourseCode = code,
                Description = description,
                Start = null,
                End = null
            };

            await _courseRepository.CreateCourse(course);
            
            var enrollment = new Enrollment
            {
                Course = course,
                User = user,
                CreatedBy = user
            };
            await _enrollmentRepository.CreateEnrollment(enrollment);
        }
    }
}