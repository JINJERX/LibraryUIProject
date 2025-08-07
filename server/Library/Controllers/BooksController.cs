using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Library.DTOs;
using Library.Repositories.Interfaces;
using Library.Models;

namespace Library.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepo;
        private readonly IMapper _mapper;

        public BooksController(IBookRepository bookRepo, IMapper mapper)
        {
            _bookRepo = bookRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetAll(
            string? search = null,
            int? genreId = null,
            int? authorId = null,
            string? sort = null)
        {
            var books = await _bookRepo.GetAllAsync();

            if (!string.IsNullOrWhiteSpace(search))
                books = books.Where(b => b.Title.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();

            if (genreId.HasValue)
                books = books.Where(b => b.GenreId == genreId.Value).ToList();

            if (authorId.HasValue)
                books = books.Where(b => b.AuthorId == authorId.Value).ToList();

            if (sort == "asc")
                books = books.OrderBy(b => b.YearPublished).ToList();
            else if (sort == "desc")
                books = books.OrderByDescending(b => b.YearPublished).ToList();

            var result = books.Select(b => new BookDto
            {
                Id = b.Id,
                Title = b.Title,
                YearPublished = b.YearPublished,
                AuthorId = b.AuthorId,
                GenreId = b.GenreId,
                AuthorName = b.Author?.Name ?? "Неизвестно",
                GenreName = b.Genre?.Name ?? "Неизвестно"
            });

            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetById(int id)
        {
            var book = await _bookRepo.GetByIdAsync(id);
            if (book == null)
                return NotFound();

            var result = _mapper.Map<BookDto>(book);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<BookDto>> Create(BookCreateDto bookCreateDto)
        {
            var book = _mapper.Map<Book>(bookCreateDto);
            await _bookRepo.AddAsync(book);
            var result = _mapper.Map<BookDto>(book);

            return CreatedAtAction(nameof(GetById), new { id = book.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BookUpdateDto dto)
        {
            var existingBook = await _bookRepo.GetByIdAsync(id);
            if (existingBook == null)
                return NotFound();
            _mapper.Map(dto, existingBook);
            await _bookRepo.UpdateAsync(existingBook);
            return Ok(existingBook);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _bookRepo.GetByIdAsync(id);
            if (book == null) return NotFound();

            await _bookRepo.DeleteAsync(book);
            return Ok(book);
        }
    }
}
