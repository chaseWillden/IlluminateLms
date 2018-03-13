using IlluminateLms.Business.Business;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace IlluminateLms.Business.Test.Tests
{
    public class BookmarkBusinessTest : IClassFixture<TemplateFixture>
    {
        private BookmarkedCoursesBusiness _bookmarkedCoursesBusiness;
        private CourseBusiness _courseBusiness;
        
        public BookmarkBusinessTest(TemplateFixture fixture)
        {
            _bookmarkedCoursesBusiness = fixture.ServiceProvider.GetService<BookmarkedCoursesBusiness>();
            _courseBusiness = fixture.ServiceProvider.GetService<CourseBusiness>();
        }
    }
}