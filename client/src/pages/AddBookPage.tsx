import { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Divider, CircularProgress, Alert } from '@mui/material';
import BookForm from '../components/BookForm';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';


interface Author {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

function AddBookPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
  Promise.all([
    fetch(`${API_BASE_URL}/api/authors`).then(res => res.json()),
    fetch(`${API_BASE_URL}/api/genres`).then(res => res.json())
  ])
    .then(([authorsData, genresData]) => {
      setAuthors(authorsData);
      setGenres(genresData);
    })
    .catch(err => setError('Ошибка загрузки данных'))
    .finally(() => setLoading(false));
}, []);


const handleAddBook = (book: any) => {
  fetch(`${API_BASE_URL}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
    .then(res => {
      if (!res.ok) throw new Error('Ошибка при добавлении книги');
      alert('Книга успешно добавлена!');
    })
    .catch(err => alert(err.message));
};

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            ➕ Добавить книгу
          </Typography>

          <Divider sx={{ my: 2 }} />

          {loading && <CircularProgress />} 
          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && (
            <BookForm
              authors={authors}
              genres={genres}
              onSave={handleAddBook}
              onCancel={() => navigate('/')}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default AddBookPage;
