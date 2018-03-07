using System;
using AutoMapper;
using IlluminateLms.Business.Helpers;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IlluminateLms.Business.Test
{
    public class TemplateFixture
    {
        public readonly IServiceProvider ServiceProvider;
        private const bool UseInMemoryDatabase = true;

        public TemplateFixture()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            var config = builder.Build();

            var services = new ServiceCollection();

            // ReSharper disable once ConditionIsAlwaysTrueOrFalse
            if (UseInMemoryDatabase)
            {
                services.AddDbContext<IlluminateLmsContext>(options => options.UseInMemoryDatabase("IlluminateLms"));
            }
            
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<IlluminateLmsContext>()
                .AddDefaultTokenProviders()
                .AddRoleManager<RoleManager<ApplicationRole>>()
                .AddSignInManager<SignInManager<ApplicationUser>>();

            ServiceCollectionExtensions.UseStaticRegistration = false;
            services.AddAutoMapper(typeof(AutomapperProfile));
            
            CommonConfig.ConfigServices(services);

            ServiceProvider = services.BuildServiceProvider();

            Setup();

        }

        /// <summary>
        /// Run to setup in memory database.
        /// </summary>
        private void Setup()
        {
            var ctx = ServiceProvider.GetService<IlluminateLmsContext>();
        }

        public void Dispose()
        {
            
        }
    }
}