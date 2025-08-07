import {
  Box,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { useState, useEffect } from 'react';
import { BookFormData } from '../types/types';

interface BookFormProps {
  book?: BookFormData;
  authors: Author[];
  genres: Genre[];
  onSave: (book: BookFormData) => void;
  onCancel: () => void;
}

interface Author {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

function BookForm({ book, authors, genres, onSave, onCancel }: BookFormProps) {
  const [form, setForm] = useState<BookFormData>({
    id: 0,
    title: '',
    year: new Date().getFullYear(),
    authorId: authors.length > 0 ? authors[0].id : 0,
    genreId: genres.length > 0 ? genres[0].id : 0
  });

  useEffect(() => {
    if (book) {
      setForm(book);
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'authorId' || name === 'genreId' ? +value : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorId || !form.genreId) {
      alert('Пожалуйста, выберите автора и жанр');
      return;
    }
    onSave(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        required
        label="Название книги"
        name="title"
        value={form.title}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Год издания"
        name="year"
        type="number"
        value={form.year}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        select
        label="Автор"
        name="authorId"
        value={form.authorId || ''}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="">Выберите автора</MenuItem>
        {authors.map(author => (
          <MenuItem key={author.id} value={author.id}>
            {author.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        required
        select
        label="Жанр"
        name="genreId"
        value={form.genreId || ''}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="">Выберите жанр</MenuItem>
        {genres.map(genre => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        {book ? 'Сохранить изменения' : 'Добавить'}
      </Button>
      {onCancel && (
        <Button variant="text" sx={{ mt: 2, ml: 2 }} onClick={onCancel}>
          Отмена
        </Button>
      )}
    </Box>
  );
}

export default BookForm;
