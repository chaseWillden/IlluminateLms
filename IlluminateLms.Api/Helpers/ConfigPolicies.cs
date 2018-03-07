using IlluminateLms.Api.Policies;
using IlluminateLms.Enterprise.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace IlluminateLms.Api.Helpers
{
    public class ConfigPolicies
    {
        public static void Config(IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                
            });
        }
    }
}