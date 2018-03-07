using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Interfaces;
using IlluminateLms.Enterprise.Utilities;
using Microsoft.EntityFrameworkCore;

namespace IlluminateLms.Enterprise.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IlluminateLmsContext _ctx;

        public AccountRepository(IlluminateLmsContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// Create new account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<Account> CreateAccount(Account account)
        {
            await _ctx.Accounts.AddAsync(account);
            await _ctx.SaveChangesAsync();
            return account;
        }

        /// <summary>
        /// Get all accounts
        /// </summary>
        /// <returns></returns>
        public async Task<List<Account>> GetAllAccounts()
        {
            var accounts = await _ctx.Accounts
                .Include(x => x.ParentAccount)
                .Where(x => !x.IsArchived).ToListAsync();
            return accounts.ToList();
        }

        /// <summary>
        /// Get account by Id
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<Account> GetAccountById(long accountId)
        {
            var account = await _ctx.Accounts
                .Include(x => x.ParentAccount)
                .FirstOrDefaultAsync(x => x.AccountId == accountId && !x.IsArchived);
            return account;
        }

        /// <summary>
        /// Get children accounts
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<List<Account>> GetChildrenAccounts(long accountId)
        {
            var accounts = await _ctx.Accounts
                .Include(x => x.ParentAccount)
                .Where(x => x.ParentAccountId == accountId && !x.IsArchived)
                .ToListAsync();

            return accounts.ToList();
        }

        /// <summary>
        /// Update an account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Account> UpdateAccount(Account account)
        {
            var accountEntity = await _ctx.Accounts
                .Include(x => x.ParentAccount)
                .FirstOrDefaultAsync(x => x.AccountId == account.AccountId);
            
            if (accountEntity == null)
            {
                throw new Exception("Account not found");
            }

            UpdateEntity.Merge(accountEntity, account);
            
            await _ctx.SaveChangesAsync();
            return accountEntity;
        }

        /// <summary>
        /// Archive an account and all of the children
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<bool> ArchiveAnAccount(long accountId)
        {
            var account = await _ctx.Accounts.FirstOrDefaultAsync(x => x.AccountId == accountId);
            if (account != null)
            {
                account.IsArchived = true;
            }
            await _ctx.SaveChangesAsync();
            return await ArchiveChildrenAccounts(accountId);
        }

        /// <summary>
        /// Get root accounWe    
        /// </summary>
        /// <returns></returns>
        public async Task<Account> GetRootAccount()
        {
            var accountEntity = await _ctx.Accounts
                .Include(x => x.ParentAccount)
                .Where(x => x.IsRoot)
                .FirstOrDefaultAsync();

            return accountEntity;
        }

        /// <summary>
        /// Archive child accounts
        /// </summary>
        /// <param name="parentAccountId"></param>
        /// <returns></returns>
        public async Task<bool> ArchiveChildrenAccounts(long parentAccountId)
        {
            var children = await _ctx.Accounts.Where(x => x.ParentAccountId == parentAccountId).ToListAsync();
            foreach (var child in children)
            {
                await ArchiveAnAccount(child.AccountId);
            }

            return true;
        } 
    }
}