using AutoMapper;
using Library.DTOs;
using Library.Models;
using Library.Repositories.Implementations;
using Library.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorRepository _authRepo;
        private readonly IMapper _mapper;

        public AuthorsController(IAuthorRepository authRepo, IMapper mapper)
        {
            _authRepo = authRepo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorDto>>> GetAll()
        {
            var authors = await _authRepo.GetAllAsync();
            var result = _mapper.Map<IEnumerable<AuthorDto>>(authors);
            return Ok(result);
        }




        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorDto>> GetById(int id)
        {
            var author = await _authRepo.GetByIdAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<AuthorDto>(author);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<AuthorDto>> Create(AuthorCreateDto dto)
        {
            var author = _mapper.Map<Author>(dto);
            await _authRepo.AddAsync(author);
            var result = _mapper.Map<AuthorDto>(author);

            return CreatedAtAction(
                nameof(GetById),
                new { id = author.Id },
                result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AuthorUpdateDto dto)
        {
            var existingauthor = await _authRepo.GetByIdAsync(id);
            if (existingauthor == null)
            {
                return NotFound();
            }
            _mapper.Map(dto, existingauthor);
            await _authRepo.UpdateAsync(existingauthor);
            
            var result = _mapper.Map<AuthorDto>(existingauthor);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingAuthor = await _authRepo.GetByIdAsync(id);
            if (existingAuthor == null)
            {
                return NotFound();
            }

            await _authRepo.DeleteAsync(existingAuthor);
            return Ok(existingAuthor);
        }
    }
}
