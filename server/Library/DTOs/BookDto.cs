namespace Library.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int YearPublished { get; set; }
        public int AuthorId { get; set; }
        public int GenreId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string GenreName { get; set; } = string.Empty;
    }

}
