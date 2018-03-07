using System.Threading.Tasks;
using IlluminateLms.Business.Business;
using IlluminateLms.Business.Model;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace IlluminateLms.Business.Test.Tests
{
    public class AccountBusinessTest : IClassFixture<TemplateFixture>
    {
        private readonly AccountBusiness _accountBusiness;
        
        public AccountBusinessTest(TemplateFixture fixture)
        {
            _accountBusiness = fixture.ServiceProvider.GetService<AccountBusiness>();
        }

        [Theory]
        [InlineData("All Accounts")]
        [InlineData("BYU-Idaho")]
        public async Task CreateAccountTest(string name)
        {
            var account = new Account
            {
                Name = name
            };
            var entity = await _accountBusiness.CreateAccount(account);
            Assert.NotNull(entity);
            Assert.True(entity.AccountId > -1);
            Assert.Equal(entity.Name, name);
        }

        [Theory]
        [InlineData("BYU-Idaho")]
        public async Task GetAllAccountsTest(string name)
        {
            
            var account = new Account
            {
                Name = name
            };
            await _accountBusiness.CreateAccount(account);
            var accounts = await _accountBusiness.GetAllAccounts();
            Assert.NotNull(accounts);
            Assert.NotEmpty(accounts);
        }

        [Theory]
        [InlineData("BYU-Idaho")]
        public async Task GetAccountByIdTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account
            {
                Name = name
            });

            Assert.NotNull(account);

            if (account.AccountId != null)
            {
                var retrieved = await _accountBusiness.GetAccountById((long) account.AccountId);
                Assert.NotNull(retrieved);
                Assert.Equal(retrieved.Name, name);
            }
        }

        [Theory]
        [InlineData("BYU-Idaho")]
        public async Task GetChildrenAccountsTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account
            {
                Name = name
            });

            Assert.NotNull(account);

            var child = await _accountBusiness.CreateAccount(new Account
            {
                Name = name + "_child",
                ParentAccount = account
            });
            
            Assert.NotNull(child);

            var children = await _accountBusiness.GetChildrenAccounts((long) account.AccountId);
            Assert.NotNull(children);
            Assert.NotEmpty(children);
        }

        [Theory]
        [InlineData("BYU-Idaho", "BYU-Hawaii")]
        public async Task UpdateAccountTest(string name, string changeTo)
        {
            var account = await _accountBusiness.CreateAccount(new Account
            {
                Name = name
            });
            
            Assert.NotNull(account);

            account.Name = changeTo;
            var updated = await _accountBusiness.UpdateAccount(account);
            Assert.NotNull(updated);
            Assert.Equal(changeTo, updated.Name);
        }

        [Theory]
        [InlineData("BYU-Idaho")]
        public async Task ArchiveAnAccountTest(string name)
        {
            var account = await _accountBusiness.CreateAccount(new Account
            {
                Name = name
            });
            
            Assert.NotNull(account);

            if (account.AccountId != null)
            {
                await _accountBusiness.ArchiveAnAccount((long) account.AccountId);

                var archived = await _accountBusiness.GetAccountById((long) account.AccountId);
                Assert.Null(archived);
            }
        }
    }
}