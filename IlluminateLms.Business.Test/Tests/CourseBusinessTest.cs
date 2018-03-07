using System.Threading.Tasks;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace IlluminateLms.Business.Test.Tests
{
    public class CourseBusinessTest : IClassFixture<TemplateFixture>
    {
        private readonly CourseBusiness _courseBusiness;
        private readonly AccountBusiness _accountBusiness;
        
        public CourseBusinessTest(TemplateFixture fixture)
        {
            _courseBusiness = fixture.ServiceProvider.GetService<CourseBusiness>();
            _accountBusiness = fixture.ServiceProvider.GetService<AccountBusiness>();
        }

        [Theory]
        [InlineData("ACCTG 180")]
        [InlineData("B 100")]
        public async Task CreateCourseTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account {Name = "Base"});
            Assert.NotNull(account);
            Assert.True(account.AccountId > -1);

            var course = await _courseBusiness.CreateCourse(new Course
            {
                Name = name,
                CourseCode = name,
                RootAccount = account,
                Account = account
            });
            
            Assert.NotNull(course);
            Assert.Equal(course.Name, name);
            Assert.NotNull(course.Account);
            Assert.NotNull(course.RootAccount);
            Assert.Equal(course.Account.AccountId, account.AccountId);
        }

        [Theory]
        [InlineData("ACCTG 180")]
        [InlineData("B 100")]
        public async Task GetCourseByIdTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account {Name = "Base"});
            Assert.NotNull(account);
            Assert.True(account.AccountId > -1);

            var course = await _courseBusiness.CreateCourse(new Course
            {
                Name = name,
                CourseCode = name,
                RootAccount = account,
                Account = account
            });
            
            Assert.NotNull(course);

            var found = await _courseBusiness.GetCourseById((long) course.CourseId);
            
            Assert.NotNull(found);
        }
        
        [Theory]
        [InlineData("ACCTG 180")]
        [InlineData("B 100")]
        public async Task FindCourseTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account {Name = "Base"});
            Assert.NotNull(account);
            Assert.True(account.AccountId > -1);

            var course = await _courseBusiness.CreateCourse(new Course
            {
                Name = name,
                CourseCode = name,
                RootAccount = account,
                Account = account
            });
            
            Assert.NotNull(course);

            var found = await _courseBusiness.FindCourse(name);
            
            Assert.NotNull(found);
        }
        
        [Theory]
        [InlineData("ACCTG 180")]
        [InlineData("B 100")]
        public async Task GetCoursesByAccountIdTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account {Name = "Base"});
            Assert.NotNull(account);
            Assert.True(account.AccountId > -1);

            var course = await _courseBusiness.CreateCourse(new Course
            {
                Name = name,
                CourseCode = name,
                RootAccount = account,
                Account = account
            });
            
            Assert.NotNull(course);

            var found = await _courseBusiness.GetCoursesByAccountId((long) account.AccountId);
            
            Assert.NotNull(found);
            Assert.NotEmpty(found);
        }
        
        [Theory]
        [InlineData("ACCTG 180")]
        [InlineData("B 100")]
        public async Task ArchiveCourseTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account {Name = "Base"});
            Assert.NotNull(account);
            Assert.True(account.AccountId > -1);

            var course = await _courseBusiness.CreateCourse(new Course
            {
                Name = name,
                CourseCode = name,
                RootAccount = account,
                Account = account
            });
            
            Assert.NotNull(course);

            var archived = await _courseBusiness.ArchiveCourse((long) account.AccountId);
            Assert.True(archived);
        }
    }
}