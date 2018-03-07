using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IlluminateLms.Enterprise.Entities;
using IlluminateLms.Enterprise.Interfaces;

namespace IlluminateLms.Business.Business
{
    public class AccountBusiness
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public AccountBusiness(IAccountRepository accountRepository, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Create new account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<Model.Account> CreateAccount(Model.Account account)
        {
            var accountEntity = _mapper.Map<Account>(account);

            if (accountEntity.ParentAccount != null)
            {
                accountEntity.ParentAccountId = accountEntity.ParentAccount.AccountId;
                accountEntity.ParentAccount = null;
            }
            
            var entity = await _accountRepository.CreateAccount(accountEntity);
            
            return _mapper.Map<Model.Account>(entity);
        }

        /// <summary>
        /// Get all accounts
        /// </summary>
        /// <returns></returns>
        public async Task<List<Model.Account>> GetAllAccounts()
        {
            var accounts = await _accountRepository.GetAllAccounts();
            return accounts.Select(_mapper.Map<Model.Account>).ToList();
        }

        /// <summary>
        /// Get account by Id
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<Model.Account> GetAccountById(long accountId)
        {
            var account = await _accountRepository.GetAccountById(accountId);
            return _mapper.Map<Model.Account>(account);
        }

        /// <summary>
        /// Get children accounts
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<List<Model.Account>> GetChildrenAccounts(long accountId)
        {
            var accounts = await _accountRepository.GetChildrenAccounts(accountId);
            return accounts.Select(_mapper.Map<Model.Account>).ToList();
        }

        /// <summary>
        /// Update an account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Model.Account> UpdateAccount(Model.Account account)
        {
            var accountEntity = _mapper.Map<Account>(account);
            var result = await _accountRepository.UpdateAccount(accountEntity);
            return _mapper.Map<Model.Account>(result);
        }

        /// <summary>
        /// Archive an account and all of the children
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public async Task<bool> ArchiveAnAccount(long accountId)
        {
            return await _accountRepository.ArchiveAnAccount(accountId);
        }

        /// <summary>
        /// Get root account
        /// </summary>
        /// <returns></returns>
        public async Task<Model.Account> GetRootAccount()
        {
            var root = await _accountRepository.GetRootAccount();
            return _mapper.Map<Model.Account>(root);
        }

        /// <summary>
        /// Archive child accounts
        /// </summary>
        /// <param name="parentAccountId"></param>
        /// <returns></returns>
        private async Task<bool> ArchiveChildrenAccounts(long parentAccountId)
        {
            var children = await GetChildrenAccounts(parentAccountId);
            foreach (var child in children)
            {
                if (child.AccountId != null) await ArchiveAnAccount((long) child.AccountId);
            }

            return true;
        }  
    }
}