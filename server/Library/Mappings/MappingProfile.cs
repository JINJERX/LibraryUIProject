using AutoMapper;
using Library.Models;
using Library.DTOs;

namespace Library.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Book, BookDto>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name))
                .ForMember(dest => dest.GenreName, opt => opt.MapFrom(src => src.Genre.Name));

            CreateMap<BookCreateDto, Book>();
            CreateMap<BookUpdateDto, Book>();

            // Author
            CreateMap<Author, AuthorDto>();
            CreateMap<AuthorCreateDto, Author>();
            CreateMap<AuthorUpdateDto, Author>();
            // Genre
            CreateMap<Genre, GenreDto>();
            CreateMap<GenreCreateDto, Genre>();
            CreateMap<GenreUpdateDto, Genre>();
        }
    }
}
