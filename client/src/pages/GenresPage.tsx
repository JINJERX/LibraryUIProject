import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import GenreCard from '../components/GenreCard';
import GenreForm from '../components/GenreForm';
import { getAllGenres, createGenre, updateGenre, deleteGenre } from '../services/genreService';

interface Genre {
  id: number;
  name: string;
}

function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadGenres = () => {
    setLoading(true);
    getAllGenres()
      .then(setGenres)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadGenres();
  }, []);

  const handleAdd = (name: string) => {
    createGenre(name)
      .then(newGenre => {
        setGenres(prev => [...prev, newGenre]);
        setShowForm(false);
      })
      .catch(err => alert(err.message));
  };

  const handleEdit = (genre: Genre) => {
    setEditingGenre(genre);
    setShowForm(true);
  };

  const handleUpdate = (name: string) => {
    if (!editingGenre) return;
    updateGenre(editingGenre.id, name)
      .then(updated => {
        setGenres(prev => prev.map(g => g.id === updated.id ? updated : g));
        setEditingGenre(null);
        setShowForm(false);
      })
      .catch(err => alert(err.message));
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Удалить этот жанр?')) return;
    deleteGenre(id)
      .then(() => setGenres(prev => prev.filter(g => g.id !== id)))
      .catch(err => alert(err.message));
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            🎭 Жанры
          </Typography>

          <Divider sx={{ my: 2 }} />

          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && (
            <>
              <Grid container spacing={2}>
                {genres.map(genre => (
                  <Grid item xs={12} sm={6} key={genre.id}>
                    <GenreCard
                      id={genre.id}
                      name={genre.name}
                      onEdit={() => handleEdit(genre)}
                      onDelete={() => handleDelete(genre.id)}
                    />
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 4 }} />

              {!showForm && (
                <Button variant="contained" onClick={() => setShowForm(true)}>
                  ➕ Добавить жанр
                </Button>
              )}

              {showForm && (
                <Box mt={2}>
                  <Typography variant="h6">
                    {editingGenre ? '✏️ Редактировать жанр' : '➕ Новый жанр'}
                  </Typography>
                  <GenreForm
                    initialName={editingGenre?.name}
                    onSubmit={editingGenre ? handleUpdate : handleAdd}
                    onCancel={() => {
                      setEditingGenre(null);
                      setShowForm(false);
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default GenresPage;
