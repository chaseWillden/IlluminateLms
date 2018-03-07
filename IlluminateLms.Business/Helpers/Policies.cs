using IlluminateLms.Enterprise.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace IlluminateLms.Business.Helpers
{
    public class Policies
    {
        public static void Config(IServiceCollection services)
        {
            services.AddAuthorization(x =>
            {
                foreach (var policy in ApplicationPermissions.AllPermissions)
                {
                    x.AddPolicy(policy.Name, config => config.RequireClaim(CustomClaimTypes.Permission, policy.Value));
                }
            });
        }
    }
}