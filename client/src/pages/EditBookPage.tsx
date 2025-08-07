import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Paper, Divider, CircularProgress, Alert
} from '@mui/material';
import BookForm from '../components/BookForm';
import { API_BASE_URL } from '../config';
import { Book, BookFormData } from '../types/types';

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/books/${id}`).then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      }),
      fetch(`${API_BASE_URL}/api/authors`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/genres`).then(res => res.json())
    ])
      .then(([bookData, authorsData, genresData]) => {
        setBook(bookData);
        setAuthors(authorsData);
        setGenres(genresData);
      })
      .catch(() => setError('Ошибка загрузки данных'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (updatedBook: BookFormData) => {
    fetch(`${API_BASE_URL}/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: updatedBook.title,
        yearPublished: updatedBook.year, // 👈 важно!
        authorId: updatedBook.authorId,
        genreId: updatedBook.genreId
      })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        alert('Книга успешно обновлена');
        navigate('/');
      })
      .catch(() => alert('Ошибка при обновлении книги'));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center">✏️ Редактировать книгу</Typography>
        <Divider sx={{ my: 2 }} />
        {loading ? <CircularProgress /> :
          error ? <Alert severity="error">{error}</Alert> :
            book && (
              <BookForm
                book={{
                  id: book.id,
                  title: book.title,
                  year: book.yearPublished, 
                  authorId: book.authorId,
                  genreId: book.genreId
                }}
                authors={authors}
                genres={genres}
                onSave={handleUpdate}
                onCancel={() => navigate('/')}
              />
            )}
      </Paper>
    </Container>
  );
}

export default EditBookPage;
