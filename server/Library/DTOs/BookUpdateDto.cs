using System.ComponentModel.DataAnnotations;

namespace Library.DTOs
{
    public class BookUpdateDto
    {
        [Required(ErrorMessage = "Название книги обязательно")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Длина должна быть от 2 до 50 символов")]
        public string Title { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "Нужно выбрать автора")]
        public int AuthorId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Нужно выбрать жанр")]
        public int GenreId { get; set; }

        [Range(1, 3000, ErrorMessage = "Год публикации должен быть корректным")]
        public int YearPublished { get; set; }
    }

}
