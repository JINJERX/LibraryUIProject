using System.ComponentModel.DataAnnotations;

namespace Library.DTOs
{
    public class GenreDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
    public class GenreCreateDto
    {
        [Required(ErrorMessage = "Называние жанра обязательно")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Название должно быть от 2 до 50 символов")]
        public string Name { get; set; } = string.Empty;
    }

    public class GenreUpdateDto
    {
        [Required(ErrorMessage = "Называние жанра обязательно")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Название должно быть от 2 до 50 символов")]
        public string Name { get; set; } = string.Empty;
    }
}
