import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getAllBooks } from '../services/bookService';
import { Book } from '../types/types';
import { API_BASE_URL } from '../config';

function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await getAllBooks();
        setBooks(result);
      } catch (error) {
        console.error('Ошибка при загрузке книг', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book: Book) => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Удалить эту книгу?')) return;

    fetch(`${API_BASE_URL}/api/books/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setBooks(prev => prev.filter(book => book.id !== id));
      })
      .catch(() => alert('Ошибка при удалении книги'));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Список книг
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default HomePage;
