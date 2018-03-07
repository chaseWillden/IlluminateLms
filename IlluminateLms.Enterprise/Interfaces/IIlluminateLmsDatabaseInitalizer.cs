using System.Threading.Tasks;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IIlluminateLmsDatabaseInitalizer
    {
        Task SeedAsync();
    }
}