using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace IlluminateLms.Business.Test.Tests
{
    public class RoleBusinessTest : IClassFixture<TemplateFixture>
    {
        private readonly RoleBusiness _roleBusiness;
        
        public RoleBusinessTest(TemplateFixture fixture)
        {
            _roleBusiness = fixture.ServiceProvider.GetService<RoleBusiness>();
        }

        [Theory]
        [InlineData("CreatedRole")]
        public async Task CreateRoleTest(string name)
        {
            var created = await _roleBusiness.CreateRole(new Role
            {
                Name = name,
                Description = name,
                Permissions = new List<Permission>()
            });
            
            Assert.NotNull(created);
            Assert.Equal(created.Name, name);
        }

        [Theory]
        [InlineData("TestRole")]
        public async Task GetAllRolesTest(string name)
        {
            var created = await _roleBusiness.CreateRole(new Role
            {
                Name = name,
                Description = name,
                Permissions = new List<Permission>()
            });
            
            var roles = await _roleBusiness.GetAllRoles();
            Assert.NotEmpty(roles);
        }

        [Theory]
        [InlineData("TestRole")]
        public async Task GetRoleByIdTest(string name)
        {
            var created = await _roleBusiness.CreateRole(new Role
            {
                Name = name,
                Description = name,
                Permissions = new List<Permission>()
            });
            
            Assert.NotNull(created);

            var results = await _roleBusiness.GetRoleById(created.RoleId);
            Assert.NotNull(results);
            Assert.Equal(results.Name, name);
        }

        [Theory]
        [InlineData("TestRole")]
        public async Task GetRoleByNameTest(string name)
        {
            var created = await _roleBusiness.CreateRole(new Role
            {
                Name = name,
                Description = name,
                Permissions = new List<Permission>()
            });
            
            Assert.NotNull(created);

            var results = await _roleBusiness.GetRoleByName(created.Name);
            Assert.NotNull(results);
            Assert.Equal(results.Name, name);   
        }

        [Theory]
        [InlineData("TestRole", "TestRole2")]
        public async Task UpdateRoleTest(string name, string updatedName)
        {
            var created = await _roleBusiness.CreateRole(new Role
            {
                Name = name,
                Description = name,
                Permissions = new List<Permission>()
            });
            
            Assert.NotNull(created);

            created.Name = updatedName;

            var updated = await _roleBusiness.UpdateRole(created);
            Assert.NotNull(updated);
            Assert.Equal(updated.Name, updatedName);
        }
    }
}