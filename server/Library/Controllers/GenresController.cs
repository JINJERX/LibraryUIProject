using AutoMapper;
using Library.DTOs;
using Library.Models;
using Library.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreRepository _genreRepo;
        private readonly IMapper _mapper;

        public GenresController(IGenreRepository genreRepo, IMapper mapper)
        {
            _genreRepo = genreRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreDto>>> GetAll()
        {
            var genres = await _genreRepo.GetAllAsync();
            var mapper = _mapper.Map<IEnumerable<GenreDto>>(genres);
            return Ok(mapper);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDto>> GetById(int id)
        {
            var genre = await _genreRepo.GetByIdAsync(id);
            if (genre == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<GenreDto>(genre);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<GenreDto>> Create(GenreCreateDto dto)
        {
            var create = _mapper.Map<Genre>(dto);
            await _genreRepo.AddAsync(create);
            var result = _mapper.Map<GenreDto>(create);

            return CreatedAtAction(
                nameof(GetById),
                new { id = create.Id },
                result
                );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(GenreUpdateDto dto, int id)
        {
            var existGenre = await _genreRepo.GetByIdAsync(id);
            if (existGenre == null) { return NotFound(); }

            _mapper.Map(dto, existGenre);
            await _genreRepo.UpdateAsync(existGenre);

            var result = _mapper.Map<GenreDto>(existGenre);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var genre = await _genreRepo.GetByIdAsync(id);
            if (genre == null) { return NotFound(); }

            await _genreRepo.DeleteAsync(genre);
            return Ok();
        }
    }
}
