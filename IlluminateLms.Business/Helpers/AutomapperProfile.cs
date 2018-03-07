using System;
using System.Reflection;
using AutoMapper;
using IlluminateLms.Business.Model;
using IlluminateLms.Enterprise.Entities.Identity;

namespace IlluminateLms.Business.Helpers
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Account, Enterprise.Entities.Account>().ReverseMap();
            CreateMap<Enterprise.Entities.Course, Course>()
                .ReverseMap();
            CreateMap<BookmarkedCourse, Enterprise.Entities.BookmarkedCourse>().ReverseMap();
            CreateMap<Enrollment, Enterprise.Entities.Enrollment>().ReverseMap();
            CreateMap<ApplicationUser, User>()
                .ForMember(x => x.UserId, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.FirstName, y => y.MapFrom(x => x.FirstName))
                .ForMember(x => x.LastName, y => y.MapFrom(x => x.LastName))
                .ForMember(x => x.FullName, y => y.MapFrom(x => x.FullName))
                .ForMember(x => x.SortableName, y => y.MapFrom(x => x.SortableName))
                .ForMember(x => x.Email, y => y.MapFrom(x => x.Email))
                .ForMember(x => x.IsActive, y => y.MapFrom(x => x.IsActive))
                .ForMember(x => x.UserName, y => y.MapFrom(x => x.UserName))
                .ReverseMap();
            CreateMap<ApplicationRole, Role>()
                .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
                .ForMember(x => x.RoleId, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
                .ReverseMap();
            CreateMap<ApplicationPermission, Permission>().ReverseMap();
            CreateMap<ContentItem, Enterprise.Entities.ContentItem>().ReverseMap();
        }
    }
}