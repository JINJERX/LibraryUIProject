using System.ComponentModel.DataAnnotations;

namespace Library.DTOs
{
    public class AuthorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class AuthorCreateDto
    {
        [Required(ErrorMessage = "Имя обязательно")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Имя должно быть от 2 до 50 символов")]
        public string Name { get; set; } = string.Empty;
    }

    public class AuthorUpdateDto
    {
        [Required(ErrorMessage = "Имя обязательно")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Имя должно быть от 2 до 50 символов")]
        public string Name { get; set; } = string.Empty;
    }
}
