using System.Collections.Generic;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;

namespace IlluminateLms.Enterprise.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account> CreateAccount(Account account);
        Task<List<Account>> GetAllAccounts();
        Task<Account> GetAccountById(long accountId);
        Task<List<Account>> GetChildrenAccounts(long accountId);
        Task<Account> UpdateAccount(Account account);
        Task<bool> ArchiveAnAccount(long accountId);
        Task<Account> GetRootAccount();
        Task<bool> ArchiveChildrenAccounts(long parentAccountId);
    }
}