using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Enterprise.Helpers
{
    public static class ApplicationPermissions
    {
        public static readonly List<ApplicationPermission> AllPermissions;
        
        public const string CreateCoursePolicy = "Create Course";
        public const string DeleteCoursePolicy = "Delete Course";
        public const string SearchCoursePolicy = "Search Course";
        public const string UpdateCoursePolicy = "Update Course";
        public const string ViewCoursePolicy = "View Course";

        public const string CreateAccountPolicy = "Create Account";
        public const string ViewAccountPolicy = "View Account";
        public const string DeleteAccountPolicy = "Delete Account";
        public const string UpdateAccountPolicy = "Update Account";

        public const string ViewRolesPolicy = "View Roles";
        public const string CreateRolesPolicy = "Create Roles";
        public const string AssignRolesPolicy = "Assign Roles";
        public const string UpdateRolesPolicy = "Update Roles";

        public const string ViewUsersPolicy = "View Users";
        public const string CreateUsersPolicy = "Create Users";
        public const string UpdateUsersPolicy = "Update Users";
        public const string ResetUsersPasswordPolicy = "Reset Users Password";
        public const string DeleteUserPolicy = "Delete Users";

        public const string ViewEnrollmentsPolicy = "View Enrollments";
        public const string AddEnrollmentsPolicy = "Add Enrollments";
        public const string UpdateEnrollmentsPolicy = "Update Enrollments";
        public const string DeleteEnrollmentsPolicy = "Delete Enrollments";

        private const string UsersPermissionGroupName = "User Permissions";
        private static readonly ApplicationPermission ViewUsers = new ApplicationPermission(ViewUsersPolicy, "users.view", UsersPermissionGroupName, "Permission to view other users account details");
        private static readonly ApplicationPermission CreateUsers = new ApplicationPermission(CreateUsersPolicy, "users.create", UsersPermissionGroupName, "Permission to create other users account details");
        private static readonly ApplicationPermission UpdateUsers = new ApplicationPermission(UpdateUsersPolicy, "users.update", UsersPermissionGroupName, "Permission to update other users account details");
        private static readonly ApplicationPermission ResetUsersPassword = new ApplicationPermission(ResetUsersPasswordPolicy, "users.password.update", UsersPermissionGroupName, "Permission to update other users password");
        private static readonly ApplicationPermission DeleteUser = new ApplicationPermission(DeleteUserPolicy, "users.delete", UsersPermissionGroupName, "Permission to delete other users");

        private const string RolesPermissionGroupName = "Role Permissions";
        private static readonly ApplicationPermission ViewRoles = new ApplicationPermission(ViewRolesPolicy, "roles.view", RolesPermissionGroupName, "Permission to view available roles");
        private static readonly ApplicationPermission CreateRoles = new ApplicationPermission(CreateRolesPolicy, "roles.create", RolesPermissionGroupName, "Permission to create roles");
        private static readonly ApplicationPermission AssignRoles = new ApplicationPermission(AssignRolesPolicy, "roles.assign", RolesPermissionGroupName, "Permission to assign roles to users");
        private static readonly ApplicationPermission UpdateRoles = new ApplicationPermission(UpdateRolesPolicy, "roles.update", RolesPermissionGroupName, "Permission to update roles to users");

        private const string AccountPermissionGroupName = "Account Permissions";
        private static readonly ApplicationPermission CreateAccount = new ApplicationPermission(CreateAccountPolicy, "account.create", AccountPermissionGroupName, "Permission to create accounts");
        private static readonly ApplicationPermission ViewAccounts = new ApplicationPermission(ViewAccountPolicy, "account.view", AccountPermissionGroupName, "Permission to view accounts");
        private static readonly ApplicationPermission DeleteAccounts = new ApplicationPermission(DeleteAccountPolicy, "account.delete", AccountPermissionGroupName, "Permission to delete accounts");
        private static readonly ApplicationPermission UpdateAccounts = new ApplicationPermission(UpdateAccountPolicy, "account.update", AccountPermissionGroupName, "Permission to update accounts");

        private const string CoursePermissionGroupName = "Course Permissions";
        private static readonly ApplicationPermission CreateCourse = new ApplicationPermission(CreateCoursePolicy, "course.create", CoursePermissionGroupName, "Permission to create courses");
        private static readonly ApplicationPermission DeleteCourse = new ApplicationPermission(DeleteCoursePolicy, "course.delete", CoursePermissionGroupName, "Permission to delete courses");
        private static readonly ApplicationPermission SearchCourses = new ApplicationPermission(SearchCoursePolicy, "course.search", CoursePermissionGroupName, "Permission to search courses");
        private static readonly ApplicationPermission UpdateCourse = new ApplicationPermission(UpdateCoursePolicy, "course.update", CoursePermissionGroupName, "Permission to update courses");
        private static readonly ApplicationPermission ViewCourses = new ApplicationPermission(ViewCoursePolicy, "course.view", CoursePermissionGroupName, "Permission to view courses");

        private const string EnrollmentPermissionGroupName = "Enrollment Permissions";
        private static readonly ApplicationPermission ViewEnrollments = new ApplicationPermission(ViewEnrollmentsPolicy, "enrollments.view", EnrollmentPermissionGroupName, "Permission to view enrollments");
        private static readonly ApplicationPermission AddEnrollments = new ApplicationPermission(AddEnrollmentsPolicy, "enrollments.add", EnrollmentPermissionGroupName, "Permission to add enrollments");
        private static readonly ApplicationPermission DeleteEnrollments = new ApplicationPermission(DeleteEnrollmentsPolicy, "enrollments.delete", EnrollmentPermissionGroupName, "Permission to delete enrollments");
        private static readonly ApplicationPermission UpdateEnrollments = new ApplicationPermission(UpdateEnrollmentsPolicy, "enrollments.update", EnrollmentPermissionGroupName, "Permission to update enrollments");
        
        
        static ApplicationPermissions()
        {
            var allPermissions = new List<ApplicationPermission>()
            {
                ViewUsers,
                CreateUsers,
                UpdateUsers,
                ResetUsersPassword,
                DeleteUser,

                ViewRoles,
                CreateRoles,
                AssignRoles,
                UpdateRoles,
                
                CreateAccount,
                ViewAccounts,
                DeleteAccounts,
                UpdateAccounts,
                
                CreateCourse,
                DeleteCourse,
                SearchCourses,
                UpdateCourse,
                ViewCourses,
                
                ViewEnrollments,
                AddEnrollments,
                DeleteEnrollments,
                UpdateEnrollments
            };

            AllPermissions = new List<ApplicationPermission>(allPermissions.AsReadOnly());
        }

        public static ApplicationPermission GetPermissionByName(string permissionName)
        {
            return AllPermissions.FirstOrDefault(p => p.Name == permissionName);
        }

        public static ApplicationPermission GetPermissionByValue(string permissionValue)
        {
            return AllPermissions.FirstOrDefault(p => p.Value == permissionValue);
        }

        public static string[] GetAllPermissionValues()
        {
            return AllPermissions.Select(p => p.Value).ToArray();
        }
    }
}